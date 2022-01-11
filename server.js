const express = require('express');
const { static } = express;
const path = require('path');

const app = express();

app.use('/dist', static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/student', async(req, res, next)=> {
  try {
    res.send(await Student.findAll({
        include: [ Campus]
    }));
  }
  catch(ex){
    next(ex);
  }
});


app.get('/api/campus', async(req, res, next)=> {
    try {
      res.send(await Campus.findAll({
        include: [ Student]
      }));
    }
    catch(ex){
      next(ex);
    }
  });


const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};




const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/campusdb');



const Student = conn.define('student', {
  name: STRING 
});

const Campus = conn.define('campus', {
    name: {
        type: STRING,
        unique: true
    }
  });

Student.belongsTo(Campus);
Campus.hasMany(Student)



const syncAndSeed = async()=> {
  await conn.sync({ force: true });
const [Blue_Mountain_State, South_Harmon_Institute_of_Technology, Faber_College] = await Promise.all([
    Campus.create({ name: 'South Harmon Institute of Technology' }),
    Campus.create({ name: 'Faber College' }),
    Campus.create({ name: 'Blue Mountain State' }),
])

  await Promise.all([
    Student.create({ name: 'Bluto', campusId: Blue_Mountain_State.id }),
    Student.create({ name: 'Otter', campusId: South_Harmon_Institute_of_Technology.id  }),
    Student.create({ name: 'Boon', campusId: Faber_College.id  }),
    Student.create({ name: 'poop', campusId: Faber_College.id  }),
 
  ]);
};

init();
