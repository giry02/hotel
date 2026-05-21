window.MockData = window.MockData || {};
window.MockData.tasks = [
    { id:'t1', room:'1401', type:'checkout', status:'dirty', priority:true, note:'VIP 체크인 예정 (14:00)' },
    { id:'t2', room:'1206', type:'checkout', status:'dirty', priority:false, note:'' },
    { id:'t3', room:'0807', type:'stayover', status:'dirty', priority:false, note:'수건 교체 요청' },
    { id:'t4', room:'0505', type:'stayover', status:'dirty', priority:false, note:'' },
    { id:'t5', room:'PH01', type:'checkout', status:'skip', priority:false, note:'에코 스킵 요청' },
    { id:'t6', room:'1405', type:'deep', status:'skip', priority:false, note:'에코 스킵' },
    { id:'t7', room:'1202', type:'checkout', status:'clean', priority:false, note:'' },
    { id:'t8', room:'1203', type:'checkout', status:'clean', priority:false, note:'' }
];
