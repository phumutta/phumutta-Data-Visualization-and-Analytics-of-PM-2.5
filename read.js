var time_date=[];
var  count=0;
var yearstart, monthstart, daystart, yearstop, monthstop, daystop;
var longitude=[];
var latitude=[];
var date;
var curr;
var curr2;
var temp=[];





$("#table").ready(function(){
     $("#button").on("click", async ()=> {
        $('#table').text("");
        latitude=[];
        longitude=[];
        count=0;
        console.log("READY")
        yearstart = ($("#datepicker1").get()[0].value).slice(6)
        daystart = ($("#datepicker1").get()[0].value).slice(3, 5)
        monthstart = ($("#datepicker1").get()[0].value).slice(0, 2)

        yearstop = ($("#datepicker2").get()[0].value).slice(6)
        daystop = ($("#datepicker2").get()[0].value).slice(3, 5)
        monthstop = ($("#datepicker2").get()[0].value).slice(0, 2)





        var firebaseRef2 = firebase.database().ref('quiz/sensor/team30');
        await firebaseRef2.once('value').then(function (dataSnapshot) {
            count=0;
            dataSnapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (childSnapshot) {
                     curr = childSnapshot.child('Time').val()
                     curr2 = childSnapshot.child('payload_hex').val()

                    var time = curr.slice(11, 19)
                    console.log("11111");

                    date = curr.slice(0, 10)
                    temp.push(date)
                })
            })
        })




      
        var mapRef=firebase.database().ref("quiz/location/team30/");
        await mapRef.once('value').then(function(dataSnapshot){
            count=0;
            var tmpp=0;
            
            latitude=[];
            longitude=[];
            dataSnapshot.forEach(function(line){
            date=temp[tmpp]
            console.log(tmpp)
            if ((date.slice(0, 4) >= yearstart && date.slice(0, 4) <= yearstop) && (date.slice(5, 7) >= monthstart && date.slice(5, 7) <= monthstop) && (date.slice(8) >= daystart && date.slice(8) <= daystop)) {

            
            var key = Object.keys(dataSnapshot.val())[tmpp];
            console.log("22222");
            latitude.push(dataSnapshot.child(key).child("latitude").val());
            longitude.push(dataSnapshot.child(key).child("longitude").val());
            console.log(count)
            console.log("today: "+longitude[count])
            console.log("today: "+latitude[count])
          
            count++;
                }
                tmpp++;
            })
      

    });
    
         

        
        var firebaseRef = firebase.database().ref('quiz/sensor/team30');
        await firebaseRef.once('value').then(function (dataSnapshot) {
            console.log("33333");
            count=0;
            dataSnapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (childSnapshot) {
                     curr = childSnapshot.child('Time').val()
                     curr2 = childSnapshot.child('payload_hex').val()
                     
                    var time = curr.slice(11, 19)

                    date = curr.slice(0, 10)
                    
                    var sensor = curr2.slice(2, 4)
                    sensor = parseInt(sensor, 16);
                    
                    if ((date.slice(0, 4) >= yearstart && date.slice(0, 4) <= yearstop) && (date.slice(5, 7) >= monthstart && date.slice(5, 7) <= monthstop) && (date.slice(8) >= daystart && date.slice(8) <= daystop)) {
                        
                        time_date.push(curr);
                        tmp1=longitude[count];
                        tmp2=latitude[count];
                        console.log("here: "+tmp1)
                        console.log("here: "+tmp2)
                        $("#table").append(`<tr style="cursor: pointer;" onclick ="myFunction('/${latitude[count]}/${longitude[count]}/${sensor}')">
                        <th scope="row">${count+1}</th>
                        <td>${date}</td>
                        <td>${time}</td>
                        <td>${sensor}</td>
                        </tr>`)
                        count++;
                    }

                })


                
            });
        });

        


    })
    
    console.log("READY")
    latitude=[];
    longitude=[];
    count=0;
     var mapRef=firebase.database().ref("quiz/location/team30/");
        mapRef.once('value').then(function(dataSnapshot){
            dataSnapshot.forEach(function(line){
            

            
            var key = Object.keys(dataSnapshot.val())[count];
            
            latitude.push(dataSnapshot.child(key).child("latitude").val());
            longitude.push(dataSnapshot.child(key).child("longitude").val());
            console.log(longitude[count])
            console.log(latitude[count])
          
            count++;
            })
    });
    
    var firebaseRef = firebase.database().ref('quiz/sensor/team30');
    firebaseRef.once('value').then(function(dataSnapshot){
        count=0;
        dataSnapshot.forEach(function(childSnapshot){
            
            childSnapshot.forEach(function(childSnapshot){
                var curr = childSnapshot.child('Time').val()
                var curr2 = childSnapshot.child('payload_hex').val()
                var tmp1=latitude[count];
                var tmp2=longitude[count]
                var time=curr.slice(11,19)

                var date=curr.slice(0,10)

                var sensor=curr2.slice(2,4)
                sensor = parseInt(sensor, 16);
                
                console.log(tmp1)
                console.log(tmp2)
                time_date.push(curr);
                //console.log(childSnapshot.child('Time').val());
            //    console.log(time_date)
                $("#table").append(`<tr style="cursor: pointer;" onclick ="myFunction('/${latitude[count]}/${longitude[count]}/${sensor}')">
                <th scope="row">${count+1}</th>
                <td>${date}</td>
                <td>${time}</td>
                <td>${sensor}</td>
              </tr>`)
              count++;
                // console.log(childSnapshot.val());
            })
            
            
            // var childKey = childSnapshot.key;
            // var uplink =firebase.database().ref("quiz/sensor/team01"+ childKey + "DevEUI_uplink");
            // uplink.once('value').then(function(dataSnapshot){
                // console.log(dataSnapshot.key);
                
            //     dataSnapshot.forEach(function(childSnapshot){
            //         console.log(childSnapshot.val());
            //     });
            // });
        });
    });
    

   console.log('fini')             
});


