import os

oldfiles = []

for file in os.listdir("../pages"):
    if file.endswith(".html"):
        oldfiles.append(file)

def find_between( s, first, last ):
    try:
        start = s.index( first ) + len( first )
        end = s.rfind( last, start )
        return s[start:end]
    except ValueError:
        return ""

def rfind_between( s, first, last ):
    try:
        start = s.rfind( first ) + len( first )
        end = s.rfind( last, start )
        return s[start:end]
    except ValueError:
        return ""

for file in oldfiles:
    print("newifying: ", file)
    f = open(file)
    maincontent = find_between(f.read(), '<div class="maincontent">', '</div>')
    #maincontent = maincontent + "</div>"
    linkcont = find_between(maincontent, 'href="', '"')
    if linkcont != "":
        print("Next page link: ", linkcont)
        maincontent = maincontent.replace('href="'+linkcont, 'href="?p=0'+linkcont)
        maincontent = maincontent.replace('.html', '')
    else:
        print("Noo link content? Check this one manually.")
    
    prevpaglink = rfind_between(maincontent, 'href="', '">Pre')

    if prevpaglink != "":
        print("Previous page link: ", prevpaglink)
        maincontent = maincontent.replace('href="'+prevpaglink, 'href="?p=0'+prevpaglink)
        maincontent = maincontent.replace('.html', '')
    else:
        print("Noo link content? Check this one manually.")
    
    print(maincontent)
    f.close()
    print("Creating new file")
    f = open("0" + str(file).split(".")[0] + ".md", "w")
    f.write(maincontent)
    f.close()
    


print("doneee")