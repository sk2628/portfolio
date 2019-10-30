const express = require ('express')
const app = express()
const host = process.env.PORT || 3000;

const budget = require('./models/budget');
const bank = require('./models/bank');

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//Middleware URL encoding
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//tells express to try to match requests with files in the directory called 'public'
app.use(express.static('public'));

// pass in budget and bank account balance to index page
app.get('/budgets', (req, res) => {
    res.render(`index.ejs`, {
        budgetModel: budget,
        bankModel: bank[0]
    });
})

// rendering new page
app.get('/budgets/new', (req, res) => {
    res.render(`new.ejs`);
})

// rendering individual budget detail
app.get('/budgets/:index', (req, res) => {
    res.render(`show.ejs`, {
        budgetModel: budget[req.params.index]
    });
})

//Is this the proper way to update back to the bankAccount model?
app.post('/budgets', (req, res) => {
    console.log(req.body);
    budget.push(req.body);
    bank[0].bankAccount += parseInt(req.body.amount);
    res.redirect('/budgets');
})

app.listen(host, ()=> {
    console.log(`Listening to ${host}`);
})