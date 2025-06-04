import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../model/transactionmodel';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js/auto'; 

@Component({
  selector: 'app-transactionmanagement',
  templateUrl: './transactionmanagement.component.html',
  styleUrl: './transactionmanagement.component.css',
  providers: [DatePipe]
})
export class TransactionmanagementComponent implements OnInit {


  totalAmount:number=0;
  transactions: Transaction[] = [];
  newTransaction: Transaction = new Transaction();

  constructor(
    private transactionService: TransactionsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.transactionService.getTotalTransactionAmount().subscribe({
      next:res=>{
        this.totalAmount=res
      },
      error:err=>{
        console.error(err)
      }
    });

  }


  formatDateTime(date: Date | string): string | null {
    return this.datePipe.transform(date, 'd MMM, y hh:mm:ss a');
  }


  loadTransactions(): void {
    this.transactionService.loadTransactions().subscribe({
      next: (res: Transaction[]) => {
        this.transactions = res;
        // this.updateChart(); 
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      }
    });
  }


  addTransaction(): void {
    this.newTransaction.date = new Date(); 
    this.transactionService.addTransaction(this.newTransaction).subscribe({
      next: () => {
        alert('Transaction added successfully!');
        this.loadTransactions(); 
        this.resetNewTransaction(); 
      },
      error: (err) => {
        console.error('Error adding transaction:', err);
      }
    });
  }

 

  
  removeTransaction(transactionId: number): void {
    this.transactionService.removeTransaction(transactionId).subscribe({
      next: () => {
        alert('Transaction deleted successfully!');
        this.loadTransactions(); 
      },
      error: (err) => {
        console.error('Error deleting transaction:', err);
      }
    });
  }

  
  private resetNewTransaction(): void {
    this.newTransaction = new Transaction(); 
  }

  private calculateTotalAmount(): void {
    this.totalAmount = this.transactions.reduce((sum, transaction) => {
      return sum + (transaction.amount || 0); 
    }, 0);
  }

  
}
