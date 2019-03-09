var express=require('express');
var hbs=require('hbs');
var app=express();
var fs=require('fs');
var port = process.env.PORT || 3004;
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('Upper',(text)=>{
   return text.toUpperCase()
});
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append server.log.')
        }
    });
    next();
});
// app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    // res.send("<h1>Hello express</h1>");
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my page',
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.listen(port, ()=>{
    console.log(`Server is up at port ${port}`);
});