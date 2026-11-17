import os, base64
from PIL import Image, ImageEnhance

src_path = r'C:/Users/cozme/.gemini/antigravity/brain/e80fef09-de28-4bd2-878c-cbc73b65ca6b/.user_uploaded/media_1794889421990_723b791f.png'
public_dir = r'c:/Users/cozme/Desktop/projects/talvia/talvia-frontend/public'

im = Image.open(src_path).convert('RGB')
print(f'Source image size: {im.size}')

cx, cy = 511, 326
half_size = 300
crop_box = (cx - half_size, cy - half_size, cx + half_size, cy + half_size)
crop = im.crop(crop_box)
print(f'Cropped to: {crop.size} from box {crop_box}')

sizes_config = {
    'favicon-512x512.png': (512, 512, False),
    'favicon-192x192.png': (192, 192, False),
    'apple-touch-icon.png': (180, 180, False),
    'favicon-48x48.png':  (48,  48,  True),
    'favicon-32x32.png':  (32,  32,  True),
    'favicon-16x16.png':  (16,  16,  True),
}

generated = {}
for filename, (w, h, small_opt) in sizes_config.items():
    resized = crop.resize((w, h), Image.Resampling.LANCZOS)
    if small_opt:
        resized = ImageEnhance.Sharpness(resized).enhance(1.3)
        resized = ImageEnhance.Contrast(resized).enhance(1.08)
    out_path = os.path.join(public_dir, filename)
    resized.save(out_path, format='PNG', optimize=True)
    generated[(w, h)] = resized
    print(f'Generated {filename} ({w}x{h}) -> {os.path.getsize(out_path)} bytes')

# Multi-res ICO (use 48x48 as base; Pillow will downscale to 16 and 32 internally)
ico_base = generated[(48, 48)]
ico_path = os.path.join(public_dir, 'favicon.ico')
ico_base.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print(f'Generated favicon.ico -> {os.path.getsize(ico_path)} bytes')

# SVG with embedded 512x512 PNG as base64
png512_path = os.path.join(public_dir, 'favicon-512x512.png')
with open(png512_path, 'rb') as f:
    b64_data = base64.b64encode(f.read()).decode('utf-8')

svg_content = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">\n'
    '  <rect width="512" height="512" fill="#010617"/>\n'
    '  <image width="512" height="512" href="data:image/png;base64,' + b64_data + '"/>\n'
    '</svg>'
)
svg_path = os.path.join(public_dir, 'favicon.svg')
with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)
print(f'Generated favicon.svg -> {os.path.getsize(svg_path)} bytes')

print('\nAll favicon files generated successfully!')
print('\nFiles in public dir:')
for fname in sorted(os.listdir(public_dir)):
    fpath = os.path.join(public_dir, fname)
    if os.path.isfile(fpath):
        print(f'  {fname} ({os.path.getsize(fpath)} bytes)')
