import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen:boolean = false; 
  
  
  // @HostListener('click',['$event']) onClick(clickEvent:Event){
  //   this.isOpen = !this.isOpen; 
  //   console.log("D : ",clickEvent);
  // }

  @HostListener('document:click',['$event']) toggleOpen(event:Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen : false;
  }
  constructor(private elRef:ElementRef) { }

}
