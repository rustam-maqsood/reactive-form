import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactive-forms';
  reactiveForm:FormGroup;
  ngOnInit() { 
   this.reactiveForm = new FormGroup({
    personalDetails:new FormGroup({
      firstname: new FormControl(null,[Validators.required,this.noSpaceAllowed]),
      lastname: new FormControl(null,[Validators.required,this.noSpaceAllowed]),
      email: new FormControl(null,[Validators.required,Validators.email],this.emailNotAllowed),
    }),
   gender: new FormControl('male'),
   country: new FormControl('india'),
   hobbies: new FormControl(null),
   skills:new FormArray([
    new FormControl(null,Validators.required),
   ])
    });
  //setvalue()
    setTimeout(() => {
      this.reactiveForm.setValue({
        personalDetails:{
          firstname:'',
          lastname:'',
          email:'abc@example.com',
        },
        gender:'',
        country:'',
        hobbies:'',
        skills:[]
      })
    }, 3000);


//patch value()
    setTimeout(() => {
      this.reactiveForm.patchValue({
        personalDetails:{
          firstname:'rustam', 
        }
      })
    }, 7000);
  }
  onSubmit(){
    console.log(this.reactiveForm);
  }

  //Form Array
  addskills(){
   (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required));
  }

  //custom validator
  noSpaceAllowed(control:FormControl){
    if(control.value !=null && control.value.indexOf(' ')!=-1){
      return{noSpaceAllowed:true}
    }
    return null;
  }

  // async validator
  emailNotAllowed(control:FormControl):Promise<any> | Observable<any>{
    const response = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === 'rustammaqsood777@gmail.com'){
          resolve({emailNotAllowed:true})
        }else{
          resolve(null)
        }
      },5000)
    });
    return response
  }
}
