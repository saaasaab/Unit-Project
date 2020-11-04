from PIL import Image
im = Image.open("units.jpg")

print(im.width)
crop_rectangle = (0, 0, 350, 250)
cropped_im = im.crop(crop_rectangle)

cropped_im.show()
