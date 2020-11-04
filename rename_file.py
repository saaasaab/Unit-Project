import os

for i in range(373,324,-1):
    print(i)
    
    os.rename('/unit/'+str(i)+".png",'/unit/'+str(i+4)+".png")
