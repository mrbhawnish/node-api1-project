// import dependencies
 const express = require('express');
 const generate = require('shortid').generate
 
 //Create an express application using the express module
 //Intantiate
 const app = express(); 
 app.use(express.json()); //plugging in a piece of middleware

 // Step 4 - Decide a port number
 const PORT = 8080;
 let users = [
     {
         id: generate(),
         name: "defaultName",
         bio: "defaultBio"
     },
 ]

 app.get("/api/users", (req, res) => {
    try {
        res.status(200).json(users)
    } catch(error){
        res.status(500).json(
            { errorMessage: "The users information could not be retrieved." }
        )
    }

 })

 app.get("/api/users/:id", (req, res) => {
     const { id } = req.params;
     const user = users.find(user => user.id === id)
     try{
        if(!user) {
         res.status(400).json({ message: `The User with the id:${id} does not exist`})
         } else {
             res.status(200).json(user)
         }
    } catch (error) {
        res.status(500).json(
            { errorMessage: "The users information could not be retrieved." }
        )
    }
 })
 

 app.post("/api/users", (req, res) => {
     const {name, bio} = req.body;
     const newUser = {
         id: generate(),
         name: name,
         bio: bio
     }
     try {
     if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user" })
    } else {
       users.push(newUser)
       res.status(201).json(newUser)
    }
   } catch (error) {
    res.status(500).json(
        { errorMessage: "There was an error while saving the user to the database" }
    )
    }

 })

app.put("/api/users/:id", (req, res) => {
   const {name, bio} = req.body;
   const { id } = req.params;
   const userIndex = users.findIndex(user => user.id === id)
  try {
    if(userIndex !== -1) {
        users[userIndex] = { id, name, bio }
        const user = users[userIndex]
        res.status(200).json(user)
    }
    else if(!user) {
     res.status(404).json({ message: `The user with ${id} id does not exist` })
   } else if (!name || !bio) {
    res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
   }
   } catch(error) {
    res.status(500).json(
        { errorMessage: "The user information could not be modified." }
    )
   }

})

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id)

    // const { id } = req.params
    // let findDogById = dog => {
    //     return dog.id == id
    // }
    // let foundDog = users.find(findDogById)
    // if (!foundDog) {

    //     res.status(400).json({ errorMessage: 'Can not find a dog with that ID'})
    // } else {
    //     users = users.filter((dog)=>{
    //         return dog.id != id
    //     })
    //     res.json({deleted: foundDog})
    // }
    // console.log("THIS IS ID", user)
    try {
      if (!user) {
          res.status(404).json({ message : '404 Not found'})
          
    } else {
        users = users.filter(user => user.id !== id)
        res.status(200).json({ message: `Dog with id got deleted!`})
      }
     
    } catch(error) {
      res.status(500).json({ message: 'Somethign went really bad' })
    }
  })

 app.all("*", (req, res) => {
     res.status(400).json({ message: "Not Found!"});
 });

 app.listen(PORT, ()=> {
   console.log(`SERVER IS LISTENING AT PORT ${PORT}`)
 })