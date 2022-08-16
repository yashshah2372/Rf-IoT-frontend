const http=new slhttp();
const items=document.querySelector('#items');
var desc;
var i=0;
var flag =0 ;
var t1,t2,t3,t4,t5,t6,t7,t8;
http.get('https://st0io9y728.execute-api.ap-south-1.amazonaws.com/v1/rfid')
.then(data=>{
        const result = data.Items.sort((a,b)=>{
          return new Date(a.ts.S) - new Date(b.ts.S);
        })
        //console.log(result)
        // loop to process data
        for(let i=0;i<result.length;i++){
                if(result[i].IO.N==1 && result[i].traversed!=true && result[i].REC.N == 65){
                    //loadAllData(result[i], `RFID "${result[i].RFID.S}" is in range of receiver 65`)
                    let t1 = result[i].ts.S; 
                    var rfid = result[i].RFID.S;
                    const dataFromServer = result.filter((record)=>{
                      return record.RFID.S === rfid;
                    })
                    console.log(dataFromServer);
                    desc= `RFID in range of REC 65`
                    flag=1;
                    result[i].traversed=true;
                    for(let j=0;j<dataFromServer.length;j++){
                        if(dataFromServer[j].REC.N == 65 && dataFromServer[j].IO.N==0 && dataFromServer[j].traversed!=true){
                          let t2 = dataFromServer[j].ts.S;
                          const diff = (new Date(dataFromServer[j].ts.S)-new Date(result[i].ts.S))/1000;
                          desc= `RFID ${rfid} passed through REC 65 in ${diff} secs`;
                          flag=2;
                          dataFromServer[j].traversed=true;
                          const demo = dataFromServer.filter((record)=>{
                                return record.REC.N==66;
                              })
                              if(demo.length!=0){
                                for(let c=0;c<demo.length;c++){
                                  if(demo[c].IO.N==1 && demo[c].traversed!=true){
                                      let t3 = demo[c].ts.S;
                                      desc= `RFID passed through REC 65 and in range of REC 66`;
                                      flag=3;
                                      demo[c].traversed=true;
                                      for(a=0;a<demo.length;a++){
                                          if(demo[a].IO.N==0 && demo[a].traversed!=true){
                                            let t4=demo[a].ts.S;
                                            const diff = (new Date(demo[a].ts.S)-new Date(result[i].ts.S))/1000;
                                            desc= `RFID ${rfid} passed through REC 65 and REC 66 in ${diff} secs`;
                                            flag=4;
                                          demo[a].traversed=true;
                                          loadAllData(t1,t2,t3,t4,rfid,desc);

                                              const updatedData= dataFromServer.filter((record)=>{
                                                return record.traversed!=true;
                                              })
                                              console.log(updatedData);
                                              for(let i=0;i<updatedData.length;i++){
                                                if(updatedData[i].REC.N==66 && updatedData[i].IO.N==1){
                                                    t5 = updatedData[i].ts.S;
                                                    flag=5;
                                                    updatedData[i].traversed=true;
                                                     for(let j=0;j<updatedData.length;j++){
                                                         if(updatedData[j].IO.N==0 && updatedData[j].traversed!=true){
                                                          t6=updatedData[j].ts.S;
                                                          flag=6;
                                                          updatedData[j].traversed=true;
                                                          for(let c=0;c<updatedData.length;c++){
                                                                if(updatedData[c].IO.N==1 && updatedData[c].REC.N==65 && updatedData[c].traversed!=true){
                                                                  t7=updatedData[c].ts.S;
                                                                  flag=7;
                                                                  updatedData[c].traversed=true;
                                                                  for(let a=0;a<updatedData.length;a++){
                                                                    if(updatedData[a].IO.N==0 && updatedData[a].REC.N==65 && updatedData[a].traversed!=true){
                                                                      let t8=updatedData[a].ts.S;
                                            const diff = (new Date(updatedData[a].ts.S)-new Date(updatedData[i].ts.S))/1000;
                                          desc= `RFID ${rfid} passed through REC 66 and REC 65 in ${diff} secs`
                                          flag=8;
                                          updatedData[a].traversed=true;
                                          loadAllData(t8,t7,t6,t5,rfid,desc);
                                                                      
                                                                    }
                                                                }if(flag==7){
                                                                  desc= `RFID passed through REC 66 and in range of REC 65`
                                                                  loadAllData(t8,t7,t6,t5,rfid,desc);
                                                                }
                                                         }
                                                        }if(flag==6){
                                                          desc= `RFID passed through REC 66 in ${diff} secs`
                                                      loadAllData(t8,t7,t6,t5,rfid,desc);
                                                        }
                                                         }
                                                    }
                                                    if(flag==5){
                                                      desc= `RFID in range of REC 66`
                                                      loadAllData(t8,t7,t6,t5,rfid,desc);
                                                    }
                                                  }
                                                  }
                                      }
                                  }
                                  if(flag==3){
                                    loadAllData(t1,t2,t3,t4,rfid,desc);
                                  }
                              }
                            }
                        }if(flag==2){
                          loadAllData(t1,t2,t3,t4,rfid,desc);
                        }
                    } //end of 2 loop
                }if(flag==1){
                  loadAllData(t1,t2,t3,t4,rfid,desc);
                }
        } //end of 1 loop
      }
})
.catch((err)=>console.log(err));


function loadAllData(t1,t2,t3,t4,rfid,desc){
    const trow=document.createElement('tr');
    const tdata1=document.createElement('td');
    tdata1.className="text-center";
    const tdata2=document.createElement('td');
    tdata2.className="text-center";
    const tdata3=document.createElement('td');
    tdata3.className="text-center";
    const tdata4=document.createElement('td');
    tdata4.className="text-center";
    const tdata5=document.createElement('td');
    tdata5.className="text-center";
    const tdata6=document.createElement('td');
    tdata6.className="text-center";
    const tdata7=document.createElement('td');
    tdata6.className="text-center";
    i = i + 1;
    tdata1.innerHTML=`${i}`;
    tdata2.innerHTML= new Date(new Date(t1).getTime() + 19800000).toLocaleString();
    tdata3.innerHTML = rfid;
    tdata4.innerHTML= new Date(new Date(t2).getTime() + 19800000).toLocaleString();
    tdata5.innerHTML= new Date(new Date(t3).getTime() + 19800000).toLocaleString();
    tdata6.innerHTML= new Date(new Date(t4).getTime() + 19800000).toLocaleString();
    tdata7.innerHTML= desc;
    trow.appendChild(tdata1);
    trow.appendChild(tdata3);
    trow.appendChild(tdata7);
    trow.appendChild(tdata2);
    trow.appendChild(tdata4);
    trow.appendChild(tdata5);
    trow.appendChild(tdata6);
    items.appendChild(trow);
}