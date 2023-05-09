const { Console } = require('console');
var mysql = require('mysql2');
const readline=require('readline')
var regNo,slotNum;
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "JeeVan@9951",
  database:"parking"
});

const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter Slot Number: ', (number) => {
    slotNum = number;
    
rl.question('Enter RegistrationNumber:',(number)=>{
    regNo=number;

    if (regNo &&!slotNo){
        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM parkingdetails", function (err, result, fields) {
              if (err) throw err;
              //vehicle Data in SQL
             {/* 
                { id: 1, vehicletype: 'car', registrationNo: 'MH05 5434', slotNo: 4 },
                {id: 2,vehicletype: 'bike',registrationNo: 'MH07 5353',slotNo: 0},
                { id: 3, vehicletype: 'suv', registrationNo: 'MH08 7675', slotNo: 0 },
                { id: 4, vehicletype: 'car', registrationNo: 'AP09 6442', slotNo: 1 },
                {id: 5,vehicletype: 'bike',registrationNo: 'AP07 5663',slotNo: 0  }
            */}
              const filtredData=result.filter(item=>item.registrationNo===regNo);
              if (filtredData.length===0){
                console.log("You`re not authorized to park here")
              }else{
                if(filtredData[0].slotNo===0){
                    con.connect(function(err) {
                        if (err) throw err;
                        regNo=number
                        const slotnum=Math.floor(Math.random()*5)
                        var sql = `UPDATE parkingdetails SET slotNo = '${slotnum}' WHERE registrationNo LIKE '${regNo}'`;
                        con.query(sql, function (err, result) {
                          if (err) throw err;
                          console.log("Slot Booked");
                        });
                      });
                  }else{
                    console.log("Slot Already Exist");
                  }
              }
              
            });
        });
    }else{

        con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM parkingdetails WHERE slotNo='${slotNum}'`, function (err, result, fields) {
              if (err) throw err;
              if(result.length===0){
                console.log("Empty");
              }else{
                let vehiclename=result[0].vehicletype
                console.log(`A ${vehiclename} was here`)
              }
              
            });
        });
    }

   rl.close()
});

});