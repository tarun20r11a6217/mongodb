const express = require("express");
const path = require("path"); 

        const app = express();
        const hbs = require("hbs"); // Add this line below 'const app = express();' line
        require("./db/conn"); // add it just below const app = express();
        const Register = require("./models/registers");
    // Add this line below 'require("./db/conn");' this line
        const port = process.env.PORT || 3000;
        console.log(path.join(__dirname, "../public")); // add it below const port = process.env.PORT || 3000;
        const static_path = path.join(__dirname, "../public");
        const template_path = path.join(__dirname, "../templates/views");
        const partials_path = path.join(__dirname, "../templates/partials"); // Add this line below 'const template_path = path.join(__dirname, "../templates/views");' this line
        app.use(express.json());
        app.use(express.urlencoded({extended:false}));
        // Add this line below 'const partials_path = path.join(__dirname, "../templates/partials");' this line
        app.use(express.static(static_path));
        app.get("/", (req, res) => {
            res.render("index")
        });
        app.get("/register", (req, res) => {
            res.render("register");
            });
               
            app.post("/register", async (req, res) => {
                try {
                const password = req.body.password;
                const cpassword = req.body.confirmpassword;
            
                                if(password === cpassword){
                                    const registerEmployee = new Register({
                                        firstname : req.body.firstname,
                                        lastname  : req.body.lastname,
                                        email     : req.body.email,
                                        gender    : req.body.gender,
                                        phone     : req.body.phone,
                                        age       : req.body.age,
                                        password  : password,
                                        confirmpassword: cpassword
                                    })
                                    const registered = await registerEmployee.save();
                                    res.status(201).render("index");
                                }else{
                                    res.send("passwords are not matching")
                                }
                            } catch (error) {
                                res.status(400).send(error);
                            }
                        });
                    // Add the above code just before 'app.listen()' method

        app.listen(port, () => {
            console.log(`server is running at port no ${port}`);
        })
        app.set("view engine", "hbs") 
        // add this line just below app.use(express.static(static_path)); line
        app.set("views", template_path);
        hbs.registerPartials(partials_path); // Add this line below 'app.set("views", template_path);' line
