//import module express ด้วยการใช้ require
const express = require('express')

//import instant Pool จาก module node-postgres ด้วยการใช้ require
const { Pool } = require('pg')

//import module body-parser ด้วยการใช้ require
const bodyParser = require('body-parser')

//เรียกใช้งาน environment variable จาก module dotenv
require('dotenv').config()

//import module cors ด้วยการใช้ require
const cors = require('cors')

//express() เป็นฟังค์ชั่น และ assign ไว้ที่ตัวแปร app
const app = express()
const port = 8080

//ตั้งค่า Body Parser เพื่อให้สามารถอ่านค่า JSON ได้
app.use(bodyParser.json())

//เรียกใช้งาน cors origin function
app.use(cors())

/*app.use(function (req, res, next) {
    console.log(req.header('x-api-key'))
    if(req.header('x-api-key')===process.env.APIKEY){
        next()
    }else{
        res.status(401).send('Unauthorize')
    }
})*/

//สร้าง connection pool ใหม่และกำหนด configuration เชื่อมต่อ pgSQL
//credentials กำหนดไว้ที่ไฟล์ .env และเรียกใช้งานผ่าน process.env.VARIABLE_NAME
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

//กำหนด callback function เมื่อเกิดข้อผิดพลาดขึ้นในระหว่างการเชื่อมต่อให้แสดงผลที่หน้าต่าง console
pool.on('error', (err, client) => {
 //err argument จะแสดงข้อผิดพลาดที่เกิดขึ้น
 console.error('Unexpected error on idle client', err);
 process.exit(-1);
})

//app เป็น object และมี function ชื่อเดียวกับ HTTP Method
//ตัวอย่างคือ `.get()` เหมือนกับ GET
app.get('/', (req, res) => {
 res.send('Hello World!')
})

app.get('/sensors', async (req, res) => {
    
    //ประกาศตัวแปรชื่อ text และเก็บ query string
    const text = `SELECT * FROM node_sensors tb1 WHERE id =
    (
        SELECT MAX(id) FROM node_sensors tb2 
        WHERE tb1.node_id = tb2.node_id and tb1.sensor_id = tb2.sensor_id
        GROUP BY node_id,sensor_id
    );`
    //ประกาศตัวแปร array ชื่อ values สำหรับเก็บข้อมูลที่ใช้ใน query string
    const values = []
    
    //สร้างการเชื่อมต่อ pgSQL database ผ่าน pool
    const client = await pool.connect()
  
    try {

      //Execute sql command เพื่อ query ข้อมูลจาก Database ตามเงื่อนไขที่กำหนด
      const pg_res = await client.query(text, values)

      //แสดง Query results ที่ console
      //console.log(pg_res.rows)

      //ส่ง response status และ json playload ให้ client
      res.status(200).send(pg_res.rows)

    } catch (err) {

      //กรณีที่มีข้อผิดพลาดเกิดขึ้นให้แสดงข้อผิดพลาดที่ console
      console.log(err.stack)

      //ส่ง response status และ messgae ให้ client
      res.status(500).send("Server error")

    } finally {
      
      //release pool connection เพื่อให้ request อื่นเรียกใช้งานต่อ
      client.release()

    }
    
})
  
app.post('/sensors', async (req, res) => {
    
    //แสดง json playload ที่รับมาจาก client
    console.log(req.body)

    /* JSON Formatter
    { 
        "node_id": "TEXT",
        "node_name": "TEXT",
        "memory_size": "TEXT",
        "sensor_id": "TEXT",
        "sensor_name": "TEXT",
        "sensor_value": "TEXT"
    }*/
     
    //ประกาศตัวแปรชื่อ text และเก็บ query string
    const text = `INSERT INTO public.node_sensors(
    node_id, node_name, memory_size, sensor_id, sensor_name, sensor_value, date_time)
    VALUES ( $1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *;`
    
    //ประกาศตัวแปร array ชื่อ values เก็บข้อมูลที่ใช้ใน query string โดย map กับ ${NUMBER}
    const values = [
        req.body.node_id,      //$1
        req.body.node_name,    //$2
        req.body.memory_size,  //$3
        req.body.sensor_id,    //$4
        req.body.sensor_name,  //$5
        req.body.sensor_value  //$6
    ]
    
    //สร้างการเชื่อมต่อ pgSQL database ผ่าน pool
    const client = await pool.connect()

    try {
        
        //Execute sql command เพื่อ Insert ข้อมูลลง Database
        const pg_res = await client.query(text, values)

        //แสดง Query results ที่ console
        console.log(pg_res.rows)

        //ส่ง response status และ json playload ให้ client
        res.status(201).send(pg_res.rows)

    } catch (err) {

        //กรณีที่มีข้อผิดพลาดเกิดขึ้นให้แสดงข้อผิดพลาดที่ console
        console.log(err.stack)

        //ส่ง response status และ messgae ให้ client
        res.status(500).send("Server error")

    } finally {

        //release pool connection เพื่อให้ request อื่นเรียกใช้งานต่อ
        client.release()

    }
      
})

app.get('/states', async (req, res) => {
    
    //ประกาศตัวแปรชื่อ text และเก็บ query string
    const text = `SELECT * FROM component_states tb1 WHERE id =
    (
            SELECT MAX(id) FROM component_states tb2
            WHERE tb1.cid=tb2.cid
            GROUP BY cid
    );`
    //ประกาศตัวแปร array ชื่อ values สำหรับเก็บข้อมูลที่ใช้ใน query string
    const values = []
    
    //สร้างการเชื่อมต่อ pgSQL database ผ่าน pool
    const client = await pool.connect()
  
    try {

      //Execute sql command เพื่อ query ข้อมูลจาก Database ตามเงื่อนไขที่กำหนด
      const pg_res = await client.query(text, values)

      //แสดง Query results ที่ console
      //console.log(pg_res.rows)

      //ส่ง response status และ json playload ให้ client
      res.status(200).send(pg_res.rows)

    } catch (err) {

      //กรณีที่มีข้อผิดพลาดเกิดขึ้นให้แสดงข้อผิดพลาดที่ console
      console.log(err.stack)

      //ส่ง response status และ messgae ให้ client
      res.status(500).send("Server error")

    } finally {
      
      //release pool connection เพื่อให้ request อื่นเรียกใช้งานต่อ
      client.release()

    }
    
})
  
app.post('/states', async (req, res) => {
    
    //แสดง json playload ที่รับมาจาก client
    console.log(req.body)
    
    /* JSON Formatter React UI Component State
    { 
        "id": "TEXT",
        "name": "TEXT",
        "node": "TEXT",
        "value": "TEXT"
    }*/
     
    //ประกาศตัวแปรชื่อ text และเก็บ query string
    const text = `INSERT INTO public.component_states(cid, cname, cvalue, nodeid, date_time)
    VALUES ($1, $2, $3, $4,CURRENT_TIMESTAMP) RETURNING *;`
    
    //ประกาศตัวแปร array ชื่อ values เก็บข้อมูลที่ใช้ใน query string โดย map กับ ${NUMBER}
    const values = [
        req.body.id,     //$1
        req.body.name,   //$2
        req.body.value,  //$3
        req.body.node,   //$4
    ]
    
    //สร้างการเชื่อมต่อ pgSQL database ผ่าน pool
    const client = await pool.connect()

    try {
        
        //Execute sql command เพื่อ Insert ข้อมูลลง Database
        const pg_res = await client.query(text, values)

        //แสดง Query results ที่ console
        console.log(pg_res.rows)

        //ส่ง response status และ json playload ให้ client
        res.status(201).send(pg_res.rows)

    } catch (err) {

        //กรณีที่มีข้อผิดพลาดเกิดขึ้นให้แสดงข้อผิดพลาดที่ console
        console.log(err.stack)

        //ส่ง response status และ messgae ให้ client
        res.status(500).send("Server error")

    } finally {

        //release pool connection เพื่อให้ request อื่นเรียกใช้งานต่อ
        client.release()

    }
      
})

//listen() เป็น function คล้ายๆ http module เพื่อเอาไว้ระบุว่า server จะรัน ด้วย port อะไร
//รัน Web Server ด้วย port 8080 ซึ่ง port เรากำหนดไว้ที่ตัวแปร ${port}
app.listen(port, () => {
    console.log(`IoT app listening on port ${port}`)
})