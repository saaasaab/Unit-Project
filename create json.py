import json

units = {}

for i in range(1,377):
    
    units[i] = {}
    units[i]["found"] = False
    units[i]["values"]=[{}]
    units[i]["values"][0]["units"] = ""
    units[i]["values"][0]["name"] = ""
    units[i]["values"][0]["description"] = ""
    units[i]["values"][0]["uploadDate"] = ""
    units[i]["values"][0]["uploader"] = ""
    units[i]["values"][0]["upvotes"] = ""
    units[i]["values"][0]["downvotes"] = ""

with open('unit.json', 'w') as outfile:
    json.dump(units, outfile)
