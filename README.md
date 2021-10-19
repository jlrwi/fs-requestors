# fs-requestors 
Node fs functions in [curried-parseq](https://github.com/jlrwi/curried-parseq)-style. 
 
## append_file (fs.appendFile) 
    append_file(options)(path)(callback)(data) 
## close_file (fs.close) 
    close_file(callback)(fd) 
## open_file (fs.open) 
    open_file(options)(callback)(path) 
## read_from_file (fs.read) 
    read_from_file(options)(callback)(fd) 
## read_directory (fs.readdir) 
    read_directory(options)(callback)(path) 
## read_file (fs.readFile) 
    read_file(options)(calback)(path) 
## unlink_file (fs.unlink) 
    unlink_file(callback)(path) 
## write_file (fs.writeFile) 
    write_file(options)(path)(callback)(data) 