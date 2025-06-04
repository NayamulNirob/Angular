import { Component, OnInit } from '@angular/core';
import { Sale } from '../../model/sale.model';
import { Supplier } from "../../model/Supplier";
import { ReportsService } from '../../services/reportsandanalytics.service';
import { InventoryItem } from '../../model/inventory.item.model';
import { Stock } from '../../model/stockmodel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reports-analytics',
  templateUrl: './reports-and-analytics.component.html',
  styleUrls: ['./reports-and-analytics.component.css']
})
export class ReportsAnalyticsComponent implements OnInit {

  inventoryItems: InventoryItem[] = [];
  sales: Sale[] = [];
  suppliers: Supplier[] = [];
  stock: Stock[] = [];

  salesRevenueChartData: { labels: string[], data: number[] } = { labels: [], data: [] };

  constructor(private reportsService: ReportsService,

  ) { }

  ngOnInit(): void {
    this.reportsService.loadInventory().subscribe(inventoryData => {
      this.inventoryItems = inventoryData;
    });
    this.reportsService.loadSales().subscribe(salesData => {
      this.sales = salesData;
      this.salesRevenueChartData = this.reportsService.getSalesRevenueChartData();
    });
    this.reportsService.loadSuppliers().subscribe(suppliersData => {
      this.suppliers = suppliersData;
    });
    this.reportsService.loadstocks().subscribe(stocksData => {
      this.stock=stocksData;
    })
  }



  get maxRevenue(): number {
    return Math.max(...this.salesRevenueChartData.data);
  }
  //other-data-end

  generatePDF() {
    const data = document.getElementById('print-section');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('SupplierReport.pdf'); // Generated PDF with the table
    });
  }

  generatesalePDF() {
    const data = document.getElementById('print-sections');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('SupplierReport.pdf'); // Generated PDF with the table
    });
  }

  generateStocksPDF() {
    const data = document.getElementById('print-sectionss');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('SupplierReport.pdf'); // Generated PDF with the table
    });
  }

}
