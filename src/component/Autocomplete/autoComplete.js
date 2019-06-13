import React, { Component } from 'react'

export default class Autocomplete extends Component {

    constructor(props){
        super(props);
        this.items = 
            [
                'david',
                'rakesh',
                'rishov',
                'sourav',
            ]
            this.state = {
                suggesstionBox:[],
                text:''
            };
          }

          // onchange text filter or search text form array
            onTextChange = (e) =>
            { 
              const value = e.target.value;
              let suggesstionBox = [];
              if(value.length > 0){
                const regex = new RegExp(`^${value}`,`i`); //string of text to search from 
               suggesstionBox = this.items.sort().filter(v =>regex.test(v)); // sort asec and filter from list

              } 
                 this.setState(()=>({suggesstionBox, text:value}));
        }
        // select the suggesstion 
        suggesstionSelection(value){
          this.setState(()=>({
            text: value,
            suggesstionBox:[],
          }))

        }


        //render the suggesstion against text input
        renderSuggesstions (){
          const {suggesstionBox } =this.state;
        if(suggesstionBox.length === 0){
          return null;
        }     
        return (
          <ul className="prolist">
               {suggesstionBox.map((item)=><li onClick={()=>this.suggesstionSelection(item)}>{item}</li>)}
          </ul>
        )
      
      }
  render() {
    const {text} = this.state;

    return (
      <div >
          <input className="form-control" value={text} onChange = {this.onTextChange} type="text"  />
          <ul >
                {this.renderSuggesstions()}
          </ul>
      </div>
    )
  }
}
