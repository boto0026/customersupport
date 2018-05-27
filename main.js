"use strict"

// GET DATA from JSON
function getAllCases(){
    //    console.log("https://kea-alt-del.dk/customersupport/"");
        fetch("https://kea-alt-del.dk/customersupport/")
            .then(res=>res.json())
            .then(show)
    
    }
    getAllCases();

    //GRAB ELEMENTS from JSON
    //CLONE
    //PASTE (APPEND) IN TEMPLATE, so it shows

    function show(requests){
        console.log(requests)
        let caseTemplate = document.querySelector('.case_template').content;

        requests.sort(function(a,b) {
            //console.log("a:",a);
            //console.log("b", b);

            if( a.importance < b.importance ) {
                return 1;
            } else {
                return -1;
            }
        })

        requests.forEach(request=>{
            console.log(request)
            let clone = caseTemplate.cloneNode(true);
            //show the middle name if it exists
            if(request.middle){
                //console.log("has middle", request.middle)
                clone.querySelector('.name').textContent=`${request.first} ${request.middle} ${request.last}`;
            } else {
                //console.log("no middle")
                clone.querySelector('.name').textContent=`${request.first} ${request.last}`;
            }
            //show the date
            clone.querySelector(".date").textContent=`${request.time.day} - ${request.time.month} - ${request.time.year}`;
            //show the message
            clone.querySelector(".message").textContent=request.message;
            //show importance
            clone.querySelector(".importance").textContent=request.importance;
            if(request.importance<40){
                    //then show green
                    clone.querySelector(".importance").style.color = "#32FF4F";
            }
            else if(request.importance>70){
                    //red
                    clone.querySelector(".importance").style.color = "#E82C0C";
            }
            else {
                    //yellow
                    clone.querySelector(".importance").style.color = "#FDFF4B";
            }

            // more-button
            clone.querySelector(".more").addEventListener("click", function(e) {
                console.log("Clicked more-button");
                console.log(e);
            })

            document.querySelector("#cases").appendChild(clone)
        });
    }