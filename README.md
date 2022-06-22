Project Intialize : 
    1.npm install
Scripts : 
    1.test : npm run test
    2.start : npm run start
    3.build : npm run build
Images File Structure :
    1.asset > :
        1.full
        2.thumb (for caching)
Endpoints: 
    1.image resizeing : 
        1.endpoint : /api?filename=<filename>&width=<width>&height<height>
        2.params : 
            1.filename : the name of the file in asset > full
            2.width : the width needed
            3.height : the height needed
Caching System :
    1.whenever request come we check in thumb if there is an with the name (filename_height_width)
        1.1 if there is we return it
        1.2 else : we get the image with filename from full resize it and make an image in thumb named (filename_width_height) and return the resized image