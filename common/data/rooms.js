window.MockData = window.MockData || {};
window.MockData.roomTypes = [
    { id: 'RT-STD', name: 'Standard', baseRate: 120 },
    { id: 'RT-DLX', name: 'Deluxe', baseRate: 180 },
    { id: 'RT-SUT', name: 'Suite', baseRate: 350 },
    { id: 'RT-PH', name: 'Penthouse', baseRate: 800 }
];

window.MockData.rooms = [
    { id: 'FT-0807', bldgCode: 'FT', number: '0807', display: '0807', type: 'Standard', status: 'clean', isEco: false },
    { id: 'FT-0904', bldgCode: 'FT', number: '0904', display: '0904', type: 'Standard', status: 'inspect', isEco: true },
    { id: 'FT-1002', bldgCode: 'FT', number: '1002', display: '1002', type: 'Standard', status: 'dirty', isEco: false },
    { id: 'FT-1201', bldgCode: 'FT', number: '1201', display: '1201', type: 'Deluxe', status: 'clean', isEco: false },
    { id: 'FT-1205', bldgCode: 'FT', number: '1205', display: '1205', type: 'Deluxe', status: 'clean', isEco: false },
    { id: 'OT-1401', bldgCode: 'OT', number: '1401', display: '1401', type: 'Suite', status: 'dirty', isEco: false },
    { id: 'OT-1402', bldgCode: 'OT', number: '1402', display: '1402', type: 'Suite', status: 'clean', isEco: false },
    { id: 'OT-1403', bldgCode: 'OT', number: '1403', display: '1403', type: 'Suite', status: 'clean', isEco: false },
    { id: 'OT-PH01', bldgCode: 'OT', number: 'PH01', display: 'PH01', type: 'Penthouse', status: 'clean', isEco: false },
    { id: 'OT-PH02', bldgCode: 'OT', number: 'PH02', display: 'PH02', type: 'Penthouse', status: 'dirty', isEco: false },
    { id: 'FT-0301', bldgCode: 'FT', number: '0301', display: '0301', type: 'Standard', status: 'clean', isEco: false },
    { id: 'FT-0503', bldgCode: 'FT', number: '0503', display: '0503', type: 'Standard', status: 'clean', isEco: false },
    { id: 'FT-0801', bldgCode: 'FT', number: '0801', display: '0801', type: 'Standard', status: 'clean', isEco: false }
];

window.MockData.allBuildings = [
    { name: 'Forest Tower', code: 'FT' },
    { name: 'Lakeside Villa', code: 'LV' },
    { name: 'Ocean Tower', code: 'OT' }
];

window.MockData.allRooms = [
    {id:'OT-PH01', display:'PH01', floor:20, type:'Penthouse', status:'occupied', guest:'Tran Linh', building:'OT'},
    {id:'OT-PH02', display:'PH02', floor:20, type:'Penthouse', status:'vacant-clean', guest:'', building:'OT'},
    {id:'OT-1401', display:'1401', floor:14, type:'Premier', status:'vacant-dirty', guest:'', building:'OT'},
    {id:'OT-1402', display:'1402', floor:14, type:'Premier', status:'occupied', guest:'Lee Hana', building:'OT'},
    {id:'OT-1403', display:'1403', floor:14, type:'Premier', status:'occupied', guest:'Smith J.', building:'OT'},
    {id:'OT-1405', display:'1405', floor:14, type:'Premier', status:'oos', guest:'', building:'OT'},
    {id:'FT-1201', display:'1201', floor:12, type:'Deluxe', status:'occupied', guest:'Nguyen Thi', building:'FT'},
    {id:'FT-1202', display:'1202', floor:12, type:'Deluxe', status:'vacant-clean', guest:'', building:'FT'},
    {id:'FT-1203', display:'1203', floor:12, type:'Deluxe', status:'vacant-clean', guest:'', building:'FT'},
    {id:'FT-1205', display:'1205', floor:12, type:'Deluxe', status:'occupied', guest:'Park Soo', building:'FT'},
    {id:'FT-1206', display:'1206', floor:12, type:'Deluxe', status:'vacant-dirty', guest:'', building:'FT'},
    {id:'FT-0801', display:'0801', floor:8, type:'Standard', status:'occupied', guest:'Chen Wei', building:'FT'},
    {id:'FT-0802', display:'0802', floor:8, type:'Standard', status:'occupied', guest:'Kim Da', building:'FT'},
    {id:'FT-0803', display:'0803', floor:8, type:'Standard', status:'oos', guest:'', building:'FT'},
    {id:'FT-0805', display:'0805', floor:8, type:'Standard', status:'vacant-clean', guest:'', building:'FT'},
    {id:'FT-0806', display:'0806', floor:8, type:'Standard', status:'occupied', guest:'Tanaka Y.', building:'FT'},
    {id:'FT-0807', display:'0807', floor:8, type:'Standard', status:'vacant-dirty', guest:'', building:'FT'},
    {id:'LV-V01', display:'V-01', floor:1, type:'Pool Villa', status:'occupied', guest:'Garcia M.', building:'LV'},
    {id:'LV-V02', display:'V-02', floor:1, type:'Pool Villa', status:'vacant-clean', guest:'', building:'LV'},
    {id:'LV-V03', display:'V-03', floor:1, type:'Garden Villa', status:'occupied', guest:'Bui Tien', building:'LV'},
    {id:'LV-V04', display:'V-04', floor:1, type:'Garden Villa', status:'vacant-dirty', guest:'', building:'LV'}
];
