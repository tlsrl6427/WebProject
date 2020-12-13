// 레벨기능
							var exp;
							var lv;
							var levelRef = firebase.database().ref('userInfo/'+uid+"/level_info/");
							levelRef.once("value",function(snapshot){
								exp = snapshot.val().exp;
								lv = snapshot.val().level;
								console.log(exp);
								console.log(lv);


							exp +=50;
							console.log(exp);
							if(Math.pow(2,lv-1)*50 <= exp ){
								if(Math.pow(2,lv)*50 <= exp){
									lv +=1;

									console.log("레벨업 축하드립니다");
								}
							}

							levelRef.update({
								exp: exp,
								level: lv
							});

							});
