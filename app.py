from PIL import Image
import os

# Folder containing the images
input_folder = 'images'
output_folder = 'optimized'

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Compression quality (0-100, where 100 is the highest quality)
compression_quality = 85

# Loop through all files in the input folder
for filename in os.listdir(input_folder):
    if filename.endswith(('.png', '.jpg', '.jpeg')):
        # Open the image
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)
        
        # Convert image to RGB if it has an alpha channel (e.g., PNG)
        if img.mode in ('RGBA', 'LA'):
            img = img.convert('RGB')
        
        # Define the output path with a different format if needed (e.g., convert PNG to JPEG)
        base_filename = os.path.splitext(filename)[0]
        output_path = os.path.join(output_folder, base_filename + '.jpg')
        
        # Save the image with optimization
        img.save(output_path, format='JPEG', quality=compression_quality, optimize=True)

        print(f'Optimized: {filename} -> {output_path}')

print('All images optimized.')
