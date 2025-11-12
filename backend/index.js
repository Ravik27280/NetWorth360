const express = require("express");

const { faker } = require("@faker-js/faker");

const PORT = 8000;

const app = express();

//Middleware
app.use(express.urlencoded({ extended : false }));

faker.seed(123);
function createRandomUser() {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
 
  return {
    id: faker.string.uuid(),
    // avatar: faker.image.avatar(),
    // birthday: faker.date.birthdate(),
    email: email,
    firstName: firstName,
    lastName: lastName,
    sex: sex,
    // subscriptionTier: faker.helpers.arrayElement(["free", "basic", "business"]),
  };
}

const users = Array.from({ length: 10 }, createRandomUser);

// Client side rendering
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//Server Side randering
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

// app.get('/api/users/:id', (req,res)=>{
//     const id = req.params.id
//     console.log(`id = ${id}`)
//     const user = users.find((user)=>user.id===id)

//     if (user) {
//         return res.json(user);
//     } else {
//         return res.status(404).json({ error: "User not found" });
//     }
// })

//Grouping of same routes
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    console.log(`id = ${id}`);
    const user = users.find((user) => user.id === id);

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .patch((res, req) => {
    return res.send("User update successfully");
  })
  .delete((res, req) => {
    return res.send("User deleted successfully");
  });
app.use(express.json());
app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("Body - ",body)
  users.push(body)
  return res.json({status: "User created successfully", id: body.id});
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
