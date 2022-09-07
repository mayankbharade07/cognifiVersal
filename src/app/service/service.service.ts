import { _isTestEnvironment } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import { ToastrService } from 'ngx-toastr';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public API = environment.config.API_URL;
  public API_BATA = environment.config.API_URL_BATA;
  public API_ITAC = environment.config.API_URL_ITAC;
  
  constructor(
    private http: HttpClient, 
    private toastrService : ToastrService
  ) { }
  
  public exportAsExcelLeaveBalance(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(workbook, {dateNF:"dd.MM.yyyy"});

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  //Create Expense API
  addExpenses(data) {
    return this.http.post(`${this.API}/api/Expense/CreateExpense`, data);
  };

  //Get Expense All Data API
  getexpenses() {
    
    return this.http.get(`${this.API}/api/Expense/GetExpenses`);
  }

   //Get Expense Filter Data API
   getexpensesfilter(data) {
    console.log("FIlter DAta: ",data)
    debugger
    if(data.exptype == null) {
      return this.http.get(`${this.API}/api/Expense/GetExpenseByFilters?isdatefilter=${data.isdatefilter}&fdt=${data.fdt}&tdt=${data.tdt}`);
    } else if (data.isdatefilter) {
      return this.http.get(`${this.API}/api/Expense/GetExpenseByFilters?isdatefilter=${data.isdatefilter}&fdt=${data.fdt}&tdt=${data.tdt}&exptype=${data.exptype}`);
    } else {
      return this.http.get(`${this.API}/api/Expense/GetExpenseByFilters?isdatefilter=${data.isdatefilter}&exptype=${data.exptype}`);
    }   
  }

  // Get Expenses API
  getexpensestype() {
    return this.http.get(`${this.API}/api/IncomeExpenseType/GetType`)
  }

  // Edit Expense Data API
  editExpenseData(data) {
    
    return this.http.put(`${this.API}/api/Expense/UpdateExpense`,data);
  }

  //get expense details by expenseId API
  getExpenseDetailsbyId(expenseId){
    
    return this.http.get(`${this.API}/api/Expense/GetExpenseByID?expenseid=${expenseId}`);
  }

  //delete Expense Data API
  deleteExpense(data){
    
    return this.http.delete(`${this.API}/api/Expense/DeleteExpenseByIdAsync?expenseid=${data}`);
  }

  //Documents upload
  
  //Upload Image Expense/Income API
  uploaddocs(FormData) {
    
    return this.http.post(`${this.API}/api/Expense/UploadImageFile`, FormData);
  }

  //Get Expense Filter Data API
  getincomefilter(data) {
    console.log("FIlter DAta: ",data)
    debugger
    if(data.exptype == "") {
      return this.http.get(`${this.API}/api/Income/GetIncomeByFilters?isdatefilter=${data.isdatefilter}&fdt=${data.fdt}&tdt=${data.tdt}`);
    } else if (data.isdatefilter) {
      return this.http.get(`${this.API}/api/Income/GetIncomeByFilters?isdatefilter=${data.isdatefilter}&fdt=${data.fdt}&tdt=${data.tdt}&exptype=${data.exptype}`);
    } else {
      return this.http.get(`${this.API}/api/Income/GetIncomeByFilters?isdatefilter=${data.isdatefilter}&exptype=${data.exptype}`);
    }
   
  }

  //Get Incomes Api
  getincome() {
    return this.http.get(`${this.API}/api/Income/GetIncomes`);
  }

    //get expense details by expenseId API
    getIncomeDetailsbyId(Id){
    
      return this.http.get(`${this.API}/api/Income/GetIncomeByID?incomeid=${Id}`);
    }
  

  //add income api
  addIncome(data) {
    return this.http.post(`${this.API}/api/Income/CreateIncome`, data);
  };

  //  get income type API  
  getallincometype() {
    
    return this.http.get(`${this.API}/api/IncomeExpenseType/GetAllIncomeType`)
  }  

  //  get Currency type API  
  GetCurrency() {
    
    return this.http.get(`${this.API_BATA}/api/Currency/GetCurrency`)
  }

    //  get Currency type API  
    GetCurrencybyid(id) {    
      return this.http.get(`${this.API_BATA}/api/Currency/GetCurrencyByID?currencyid=${id}`)
    }
  

  //  get income details by incometypeId API 
  getIncomedetailbyTypeId() {
    return this.http.get(`${this.API}/api/IncomeExpenseType/GetType`)
  }

  // Edit Category details API
  editIncomeData(data) {
    
    return this.http.put(`${this.API}/api/Income/UpdateIncome`,data);
  }

  //delete income API
  deleteIncome(data) {    
    return this.http.delete(`${this.API}/api/Income/DeleteIncomeByIdAsync?incomeid=${data}`);
  }

  //add Customer API
  addCustomer(data) {    
    return this.http.post(`${this.API_BATA}/api/Customer/CreateCustomer`, data);
  };

  //EDIT CUSTOMER API
  editCustomer(data) {
    return this.http.put(`${this.API_BATA}/api/Customer/UpdateCustomer`, data);
  }

  getCustomerDatabyId(){
    return this.http.get(`${this.API_BATA}/api/Customer/GetCustomerByID?customerid=1`);
  }
  
  //delete income API
  deleteCustomerdata(data) {    
    return this.http.delete(`${this.API_BATA}/api/Customer/DeleteCustomerById?customerid=${data}`);
  }

   //get expense details by expenseId API
   getcustomerDetailsbyId(customerId){    
    return this.http.get(`${this.API_BATA}/api/Customer/GetCustomerByID?customerid=${customerId}`);
  }

  //Add Bata Rule Data API
  AddBataRule(data){    
    return this.http.post(`${this.API_BATA}/api/BataSetting/CreateBataSetting`, data);
  }

   //Add Bata Rule Data API
   UpdateBataRule(data){    
    return this.http.put(`${this.API_BATA}/api/BataSetting/UpdateBataSettingV1`, data);
  }


  //delete Bata Data API
  deleteBataRule(id){    
    return this.http.delete(`${this.API_BATA}/api/BataSetting/DeleteBataSettingV1?id=${id}`);
  }

   //  get BataRule Data API
   getallbataruledata() {
    
    return this.http.get(`${this.API_BATA}/api/BataSetting/GetAllBataSettingsV1`)
  }

  //  get Base Location Data API
  getbaselocationdata() {
    
    return this.http.get(`${this.API_BATA}/api/BaseLocation/GetBaseLocation`)
  }

  
  //delete Expense Data API
  deleteBaselocation(data){
    
    return this.http.delete(`${this.API_BATA}/api/BaseLocation/DeleteBaseLocationById?id=${data}`);
  }

  // Get Manu facturer Data API
  getmanufacturerdata(){
    
    return this.http.get(`${this.API_ITAC}11018/api/manufacturer-list`)
  }

  // Get Modal Data API
  getmodaldata(){
    
    return this.http.get(`${this.API_ITAC}11018/api/model-list`)
  }

  // Get All Trips Data by User id as admin UserId=1
  getallTripsData(){
    return this.http.get(`${this.API_ITAC}11014/trips/list-trips/1`)
  }

  //GET TRIP DETAILS DATA BY TRIP ID API
  gettripDatabyId(trip_Id){    
    return this.http.get(`${this.API_ITAC}11014/trips/detail/${trip_Id}`)
  }

  // Get All Drivers Data by User id as admin UserId=1
  getallDriversData(){
    return this.http.get(`${this.API_ITAC}11022/api/drivers/1`)
  }

  // Get All Vehicle Data by User id as admin UserId=1
  getallvehicleData(){
    return this.http.get(`${this.API_ITAC}11018/api/list-vehicles/1`)
  }

  // GET TODAY TRIPS DATA API   
  gettodayTripsData(data: any){
    // console.log("http://3.108.56.174:", `${this.API_ITAC}11014/trips/user-trips`)
    return this.http.post(`${this.API_ITAC}11014/trips/user-trips`,data)
  }
  
   // Get Trips Data by As per driver as admin UserId=1
   GetDriverTrip(){
    return this.http.get(`${this.API_BATA}/api/Customer/GetCustomerByID?customerid=1`)
  }

  //UPDATE TRIP API
  updateTrip(data) {  
    console.log("ADD BASE LOCATION POST DATA:- ", data)  
    return this.http.post(`${this.API_ITAC}11014/trips/save-trip`, data);
  }

  //Get Driver Trip Data API based On TripId
  getdriverTripById(id){
    return this.http.get(`${this.API_BATA}/api/TripDriver/GetDriverTripByTripID?tripid=${id}`);
  }

  // ata Short of bata allowance
  Createshortingvalue(data){
    return this.http.post(`${this.API}/api/employees/CreateAdvaceFilter`, data);
  }
  
  // Get All Customers Data API
  getallCustomersData(){
    return this.http.get(`${this.API_BATA}/api/Customer/GetCustomer`)
  }

  //ADD BASE LOCATION DATA
  addBaselocationData(data){
    return this.http.post(`${this.API_BATA}/api/BaseLocation/CreateBaseLocation`, data)
  }

  //ADD BASE LOCATION DATA
  editBaselocationData(data){
    return this.http.put(`${this.API_BATA}/api/BaseLocation/UpdateBaseLocation`, data)
  }

  GetAllBataData(){
    return this.http.get(`${this.API_BATA}/api/Bata/GetBata`)
  }

  //Import customer bulk upload
  importcustomerdata(data){
    console.log("Import data: ",data);
    
    return this.http.post(`${this.API_BATA}/api/Customer/ImportCustomers`, data)
  }

  // saveProfile(formdata) {
  //   return this.http.put(`${this.API}/api/Expense/UploadImageFile?ImageUrl=${url}`, formdata);
  // }


  showToaster(message) {
    this.toastrService.success(message);
  }
  ErrorSuccess(message) {
    this.toastrService.error(message);
  }
  infoSuccess(message) {
    this.toastrService.info(message);
  }
  warningSuccess(message) {
    this.toastrService.warning(message);
  }
}
