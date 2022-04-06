export function sleep(millis) { 
    var now = new Date(); 
    var exitTime = now.getTime() + millis; 
    while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime) 
        return; 
    } 
}