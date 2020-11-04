from PIL import Image
from os import listdir
from os.path import isfile, join

mypath = "units/"
import os

image_list = []
for file in os.listdir(mypath):
    if file.endswith(".png"):
        image_list.append(os.path.join(mypath, file))
#print(image_list)


for file in image_list:
    parts = file.split("/")
    print(parts)
    img=Image.open(file)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        if item[0] > 100 and item[1] >100  and item[2] >100:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save("fixed/"+parts[1], "PNG")

#print(image_list)


