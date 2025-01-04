(function(Scratch) {
  'use strict';

  let links = {};
  
  let buttons = [{text: "My Button", value: "My-Button"}];

  let guiValues = {};

  const style = document.createElement("style");

    style.innerHTML = `
   
html
    {
        background: #5B7A8A;
    }
   
   .GUI
   {
       position: absolute;
       display: flex;
       flex-direction: column;
       background: #0f0f0fd0;
       width: 200px;
       min-width: 105px;
       height: 250px;
       min-height: 20px;
       align-self: center;
       left: 40%;
       top: 40%;
       resize: both;
       overflow: hidden;
       text-wrap: nowrap;
       z-index: 10000;
       border-radius: 5px;
       border: 2px solid #0f0f0fd0;
       padding: 5px;
       box-shadow: 0 0 10px #0f0f0fd0;
       backdrop-filter: blur(5px);
   }
   
   .GUI-wrapper
   {
       margin-top: 5px;
       flex-grow: 1;
       height: 100%;
       overflow-x: hidden;
       overflow-y: auto;
   }
   
   .GUI-wrapper::-webkit-scrollbar {
     width: 5px;
   }
   
   .GUI-wrapper::-webkit-scrollbar-thumb {
     background-color: grey;
     border-radius: 5px;
   }
   
   .GUI-menu
   {
       background: #354783;
       width: 100%;
       height: 20px;
       display: flex;
       align-items: center;
       justify-content:space-between;
       border-radius: 5px;
   }
   
   .GUI-text
   {
       font-family: monospace;
       color: white;
       margin: 0;
       padding: 0;
       display: inline;
       overflow: hidden;
       font-size: 15px;
   }
   
   .GUI-holder
   {
       margin-left: 5px;
       padding-right: 5px;
       display: flex;
       align-items: center;
       height: fit-content;
       width: fit-content;
       /*background-color: #354783;*/
       user-select: none;
   }
   
   .GUI-column
   {
       display:flex;
       flex-direction:column;
       gap: 5px;
       margin-top: 0;
   } 
   
   .GUI-container
   {
       display: flex;
       position: relative;
       padding-left: 25px;
       cursor: pointer;
       -webkit-user-select: none;
       -moz-user-select: none;
       -ms-user-select: none;
       user-select: none;
       color: white;
       top: 1px;
       height: 20px;
       align-items: center;
   }
   
   .GUI-container input
   {
       position: absolute;
       opacity: 0;
       cursor: pointer;
       height: 0;
       width: 0;
       accent-color: blue;
   }
   
   .GUI-checkmark
   {
       position: absolute;
       left: 0px;
       height: 20px;
       width: 20px;
       background-color: #20385c;
       border-radius: 5px;
   }
   
   .GUI-container:hover input ~ .GUI-checkmark
   {
       background-color: #2f4c77;
   }
   
   .GUI-container input:checked ~ .GUI-checkmark
   {
       background-color: #426aa7;
   }

   .GUI-button
   {
       width: fit-content;
       height: 20px;
       border: none;
       outline: none;
       background: #20385c;
       font-size: 16px;
       padding-left: 5px;
       padding-right: 5px;
       border-radius: 5px;
   }
   
   .GUI-input
   {
       height: 20px;
       border: none;
       outline: none;
       background: #20385c;
       padding: none;
       padding-left: 5px;
       padding-right: 5px;
       border-radius: 5px;
   }
   
   .GUI-input:hover
   {
       background-color: #2f4c77;
   }
   
   .GUI-button:hover
   {
       background-color: #2f4c77;
   }
   
   .GUI-button:active
   {
       background-color: #5775a3;
   }
   
   ::selection {
     background: #4974b4;
   }
   
   .GUI-collapse
   {
       display:flex;
       width: 10px;
       height: 10px;
       padding: 0;
       margin-right: 5px;
       border: none;
       border-radius: 5px;
       background: transparent;
       justify-content: center;
       align-items: center;
       overflow: visible;
   }
   
   .GUI-collapse:hover
   {
       background: #ffffff70;
   }
   
   .GUI-slider
   {
       appearance: none;
       width: 150px;
       height: 20px;
       background: #20385c;
       border-radius: 5px;
   }
   
   .GUI-slider:hover
   {
       background-color: #2f4c77;
   }
   
   .GUI-slider::-webkit-slider-thumb {
     -webkit-appearance: none;
     appearance: none;
     width: 10px;
     height: 20px;
     background: #3169be;
     cursor: pointer;
     border-radius: 5px;
   }
   
   .GUI-slider-wrapper
   {
       position:relative;
       padding: 0;
       margin: 0;
       width: fit-content;
       height: fit-content;
       display: flex;
       align-items: center;
   }
   
   .GUI-slider-value
   {
       pointer-events: none;
       position: absolute;
       left: 50%;
       transform: translateX(-50%);
   }

   .GUI-svg
   {
        width: 10px;
        min-width: 10px;
        height: 10px;
        min-height: 10px;
        display: block;
   }

   .GUI-sizer
   {
    height: 0;
    position: absolute;
    overflow: hidden;
    white-space: pre;
   }
`;
    document.head.appendChild(style);

    let collapsed = Object.create(null);
        function collapse(id)
        {
            if (collapsed[id] == false)
            {
                document.getElementById(id + "-column").style.display = "none";
                document.getElementById(id + "-wrapper").style.height = "20px";
                document.getElementById(id + "-wrapper").style.resize = "none";
                document.getElementById(id + "-plus").style.stroke = "white";
                collapsed[id] = true;
            } else
            {
                document.getElementById(id + "-column").style.display = "flex";
                document.getElementById(id + "-wrapper").style.height = "250px";
                document.getElementById(id + "-wrapper").style.resize = "both";
                document.getElementById(id + "-plus").style.stroke = "none";
                collapsed[id] = false;
            }
        }

        function updateVal()
        {
            document.getElementById("sliderVal").innerHTML = document.getElementById("slider").value;
        }

        function resetPos()
        {
            document.getElementById("x-input").value = 0;
            document.getElementById("y-input").value = 0;
            document.getElementById("z-input").value = 0;
        }

        let main = document.createElement("div");
        main.style.userSelect = "none";


        
          document.body.append(main);

//dragElement(document.getElementById("wrapper"));

function linkVariable(variable, func, gui)
  {
    let varObject = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(variable, "");
    if(varObject)
    {
      if(!links[variable])
      {
        links[variable] = {};
        links[variable].value = 0;
        links[variable].functions = [];
      }
      links[variable].value = func(varObject.value);
        links[variable].functions.push(func);
        varObject.__defineSetter__("value", function(val){
          for(let t = 0; t < 2; t++)
          {
            for(let i = 0; i < links[variable].functions.length; i++)
            {
              val = links[variable].functions[i](val);
            }
          }
          links[variable].value = val;
      });
        varObject.__defineGetter__("value", function(){
          return(links[variable].value);
        })
      guiValues[gui][guiValues[gui].length - 1].push({"var": variable, "index": links[variable].functions.length - 1});
    }
    return(null);
  }

function unlinkVariable(variable, index, gui)
{
  links[variable].functions.splice(index, 1);
  for(let i = index + 1; i < guiValues[gui].length - index; i++)
  {
    for(let t = 0; t < guiValues[gui][i].length; t++)
    {
      if(guiValues[gui][i][t].var == variable)
      {
        guiValues[gui][i][t].index -= 1;
      }
    }
  }
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    let tempBounding = elmnt.getBoundingClientRect();

    if(parseInt(elmnt.style.top, 10) < 0)
      {
        elmnt.style.top = "0px";
      }

    if(parseInt(elmnt.style.top, 10) > window.innerHeight - parseInt(tempBounding.height, 10))
      {
        elmnt.style.top = window.innerHeight - parseInt(tempBounding.height, 10) + "px";
      }

    if(parseInt(elmnt.style.left, 10) < 0)
      {
        elmnt.style.left = "0px";
      }

    if(parseInt(elmnt.style.left, 10) > window.innerWidth - parseInt(tempBounding.width, 10))
      {
        elmnt.style.left = window.innerWidth - parseInt(tempBounding.width, 10) + "px";
      }

  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

  function getRenderText(text, customVar = {"var": null, "value": null})
  {
    let finalText = text[0].value;
    for(let i = 1; i < text.length; i++)
    {
      if(text[i].type == "var")
      {
        if(text[i].value == customVar.var)
        {
          finalText = finalText + customVar.value;
        } else
        {
          let tempVar = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(text[i].value, "");
          if(tempVar)
          {
            finalText = finalText + tempVar.value;
          } else
          {
            finalText = finalText + "0";
          }
        }
      } else
      {
        finalText = finalText + text[i].value;
      }
    }
    return(finalText);
  }

  class gui {
    getInfo() {
      return {
        id: 'corbnorbsgui',
        name: Scratch.translate('Corbs GUI'),
        color1: "#354783",
        color2: "#20385c",
        blocks: [
        {
          blockType: Scratch.BlockType.LABEL,
          text: "gui"
        },
        {
          opcode: 'newGUI',
          text: 'create gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'removeGUI',
          text: 'remove gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'clearGUI',
          text: 'clear gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'showGUI',
          text: 'show gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'hideGUI',
          text: 'hide gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: "elements"
        },
        {
          opcode: 'removeElement',
          text: 'remove element [INDEX] from gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: "0"
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'addText',
          text: 'add text [TEXT] to gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "my variable has a value of ${my variable}!"
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'addCheckbox',
          text: 'add checkbox linked to variable [VARIABLE] with label [LABEL] to gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            VARIABLE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'variableMenu'
            },
            LABEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "my variable",
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'addInput',
          text: 'add input linked to variable [VARIABLE] with label [LABEL] to gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            VARIABLE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'variableMenu'
            },
            LABEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "my variable",
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: 'addSlider',
          text: 'add slider linked to variable [VARIABLE] with label [LABEL] and value min [MIN] max [MAX] with width [WIDTH] to gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            VARIABLE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'variableMenu'
            },
            LABEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "my variable",
            },
            MIN: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: "0",
            },
            MAX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: "100",
            },
            WIDTH: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 50
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: "addSeparator",
          text: "add separator to gui [ID]",
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: "buttons"
        },
        {
          opcode: 'addButton',
          text: 'add button with id [BUTTON] and label [LABEL] to gui [ID]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            BUTTON: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My Button"
            },
            LABEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "Click me",
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My GUI"
            }
          }
        },
        {
          opcode: "buttonPressed",
          text: "button [BUTTON] pressed",
          isEdgeActivated: false,
          blockType: Scratch.BlockType.EVENT,
          arguments: {
            BUTTON: {
              type: Scratch.ArgumentType.STRING,
              menu: 'buttons'
            }
          }
        }
        ],
        menus: {
            variableMenu: {
              acceptReporters: true,
              items: "getVariables" 
            },
            inputTypes: {
              acceptReporters: true,
              items: [
                "slider",
                "input",
                "value",
                "checkbox"
              ]
            },
            buttons: {
              acceptReporters: false,
              items: "getButtons"
            },
        }
      }
    }

    addSeparator(args)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      if(document.getElementById(args.ID + "-wrapper"))
      {
        let holder = document.createElement("span");
        holder.classList.add("GUI-holder");
        holder.style.height = "20px";
        document.getElementById(args.ID + "-column").appendChild(holder);
      }
    }

    getButtons()
    {
      return(buttons);
    }

    removeGUI(args)
    {
      let visID = Scratch.Cast.toString(args.ID);
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      if(document.getElementById(args.ID + "-wrapper"))
        {
          for(let t = 0; t < guiValues[args.ID].length; t++)
          {
            let tempValues = guiValues[args.ID][0];
            if(tempValues)
            {
              for(let i = 0; i < tempValues.length; i++)
              {
                unlinkVariable(tempValues[i].var, tempValues[i].index, args.ID);
              }
            }
            guiValues[args.ID].splice(0, 1);
          }
          main.removeChild(document.getElementById(args.ID + "-wrapper"));
        }
    }

    clearGUI(args)
    {
      let visID = Scratch.Cast.toString(args.ID);
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      if(document.getElementById(args.ID + "-wrapper"))
        {
          for(let t = 0; t < guiValues[args.ID].length; t++)
          {
            let tempValues = guiValues[args.ID][0];
            if(tempValues)
            {
              for(let i = 0; i < tempValues.length; i++)
              {
                unlinkVariable(tempValues[i].var, tempValues[i].index, args.ID);
              }
            }
            guiValues[args.ID].splice(0, 1);
          }
          let elements = document.getElementById(args.ID + "-column");
          elements.innerHTML = "";
        }
    }

    removeElement(args)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      args.INDEX = Scratch.Cast.toNumber(args.INDEX);
      if(document.getElementById(args.ID + "-wrapper") && args.INDEX >= 0)
      {
        let tempValues = guiValues[args.ID][args.INDEX];
        if(tempValues)
        {
          for(let i = 0; i < tempValues.length; i++)
          {
            unlinkVariable(tempValues[i].var, tempValues[i].index, args.ID);
            tempValues = guiValues[args.ID][args.INDEX];
          }
        }
        guiValues[args.ID].splice(args.INDEX, 1);
        let elements = document.getElementById(args.ID + "-column");
        elements.removeChild(elements.childNodes[args.INDEX]);
      }
    }

    addButton(args, util)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      let buttonID = Scratch.Cast.toString(args.BUTTON).split(' ').join('-');
      args.LABEL = Scratch.Cast.toString(args.LABEL);
      if(document.getElementById(args.ID + "-wrapper"))
      {
        guiValues[args.ID].push([]);
        if(!buttons.some(e => e.value === buttonID)) {buttons.push({text: args.BUTTON, value: buttonID})}
        let holder = document.createElement("span");
        holder.classList.add("GUI-holder");
        let button = document.createElement("button");
        button.classList.add("GUI-button");
        button.classList.add("GUI-text");
        button.style.fontSize = "14px";
        button.innerText = args.LABEL;
        button.onclick = function()
        {
          util.startHats('corbnorbsgui_buttonPressed', {
            BUTTON: buttonID
          });
      
        };
        holder.appendChild(button);
        document.getElementById(args.ID + "-column").appendChild(holder);
      }
    }

    addSlider(args)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      let variable = Scratch.Cast.toString(args.VARIABLE);
      args.LABEL = Scratch.Cast.toString(args.LABEL);
      args.MIN = Scratch.Cast.toNumber(args.MIN);
      args.MAX = Scratch.Cast.toNumber(args.MAX);
      args.WIDTH = Scratch.Cast.toNumber(args.WIDTH);
      if(document.getElementById(args.ID + "-wrapper"))
      {
        guiValues[args.ID].push([]);
        let variableObject = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(variable, "");
        let holder = document.createElement("span");
        holder.classList.add("GUI-holder");
        let wrapper = document.createElement("div");
        wrapper.classList.add("GUI-slider-wrapper");
        let slider = document.createElement("input");
        slider.type = "range";
        slider.min = args.MIN;
        slider.max = args.MAX;
        slider.defaultValue = variableObject.value.toString();
        slider.classList.add("GUI-slider");
        slider.classList.add("GUI-text");
        slider.id = args.ID + "-slider";
        wrapper.appendChild(slider);
        let text = document.createElement("p");
        text.classList.add("GUI-slider-value");
        text.classList.add("GUI-text");
        text.innerText = variableObject.value.toString();
        wrapper.appendChild(text);
        holder.appendChild(wrapper);
        let label = document.createElement("label");
        label.classList.add("GUI-text");
        label.htmlFor = args.ID + "-slider";
        label.style.marginLeft = "5px";
        label.innerText = args.LABEL;
        holder.appendChild(label);
        document.getElementById(args.ID + "-column").appendChild(holder);
        let link = linkVariable(variable, function(v){
          text.innerText = v;
          slider.value = v;
          return v;
        }, args.ID);
        slider.oninput = function(){variableObject.value = slider.value};
      }
    }

    addInput(args)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      let variable = Scratch.Cast.toString(args.VARIABLE);
      args.LABEL = Scratch.Cast.toString(args.LABEL);
      args.WIDTH = Scratch.Cast.toNumber(args.WIDTH);
      if(document.getElementById(args.ID + "-wrapper"))
      {
        guiValues[args.ID].push([]);
        let variableObject = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(variable, "");
        let holder = document.createElement("span");
        holder.classList.add("GUI-holder");
        let sizer = document.createElement("span");
        sizer.classList.add("GUI-sizer");
        sizer.classList.add("GUI-text");
        holder.appendChild(sizer);
        let input = document.createElement("input");
        input.classList.add("GUI-input");
        input.classList.add("GUI-text");
        input.id = args.ID + "-input";
        input.type = "text";
        input.value = variableObject.value.toString();
        input.style.minWidth = "10px";
        input.style.textAlign = "center";
        holder.appendChild(input);
        let label = document.createElement("label");
        label.style.marginLeft = "5px";
        label.classList.add("GUI-text");
        label.htmlFor = args.ID + "-input";
        label.innerText = args.LABEL;
        holder.appendChild(label);
        document.getElementById(args.ID + "-column").appendChild(holder);
        linkVariable(variable, function(v){
          if(!(document.activeElement == input))
          {
            input.value = v;
            sizer.textContent = input.value;
            input.style.width = sizer.offsetWidth + "px";
          }
          return v;
        }, args.ID);
        sizer.textContent = input.value;
        input.style.width = sizer.offsetWidth + "px";
        input.oninput = function(){
          variableObject.value = input.value;
        };
      }
    }

    addCheckbox(args)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      let variable = Scratch.Cast.toString(args.VARIABLE);
      args.LABEL = Scratch.Cast.toString(args.LABEL);
      if(document.getElementById(args.ID + "-wrapper"))
      {
        guiValues[args.ID].push([]);
        let variableObject = Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(variable, "");
        variableObject.value = false;
        let holder = document.createElement("span");
        holder.classList.add("GUI-holder");
        let container = document.createElement("label");
        container.classList.add("GUI-text");
        container.classList.add("GUI-container");
        let label = document.createElement("p");
        label.innerText = args.LABEL;
        label.classList.add("GUI-text");
        let input = document.createElement("input");
        input.type = "checkbox";
        input.value = "true";
        let checkbox = document.createElement("span");
        checkbox.id = args.ID + "-checkbox";
        checkbox.classList.add("GUI-checkmark");
        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(checkbox);
        holder.appendChild(container);
        document.getElementById(args.ID + "-column").appendChild(holder);
        linkVariable(variable, function(v){
            if (v == "true" || v == 1)
            {
              input.checked = true;
              return true;
            } else
            {
              input.checked = false;
              return false;
            }
          }, args.ID);
        input.onchange = function(){variableObject.value = input.checked};
      }
    }

    showGUI(args)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      if(document.getElementById(args.ID + "-wrapper"))
        {
        document.getElementById(args.ID + "-wrapper").style.display = "flex";
        }
    }

    hideGUI(args)
    {
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      if(document.getElementById(args.ID + "-wrapper"))
        {
        document.getElementById(args.ID + "-wrapper").style.display = "none";
        }
    }

    addText(args)
    {
      args.TEXT = Scratch.Cast.toString(args.TEXT);
      args.ID = Scratch.Cast.toString(args.ID).split(' ').join('-');
      if(document.getElementById(args.ID + "-wrapper"))
      {
        guiValues[args.ID].push([]);
        let holder = document.createElement("span");
        holder.classList.add("GUI-holder");
        let text = document.createElement("p");
        text.classList.add("GUI-text");
        if(args.TEXT.includes("${"))
        {
          let tempText = args.TEXT;
          tempText = tempText.split("${");
          let splitVars = [{"type": "text", "value": tempText[0]}];
          let vars = [];
          for(let i = 1; i < tempText.length; i++)
          {
            if(tempText[i].includes("}"))
            {
              let tempSplit = tempText[i].split("}")
              vars.push(tempSplit[0]);
              splitVars.push({"type": "var", "value": tempSplit[0]});
              splitVars.push({"type": "text", "value": tempSplit[1]});
            } else
            {
              splitVars.push({"type": "text", "value": "${" + tempText[i]})
            }
          }
          text.innerText = getRenderText(splitVars);
          for(let i = 0; i < vars.length; i++)
          {
            linkVariable(vars[i], function(v){
              text.innerText = getRenderText(splitVars, {"var": vars[i], "value": v});
              return v;
            }, args.ID);
          }
        } else
        {
          text.innerText = args.TEXT;
        }
        holder.appendChild(text);
        document.getElementById(args.ID + "-column").appendChild(holder);
      }
    }

    newGUI(args)
    {
      let visID = Scratch.Cast.toString(args.ID);
      args.ID = visID.split(' ').join('-');
      if(!document.getElementById(args.ID + "-wrapper"))
      {
        guiValues[args.ID] = [];
        let holder = document.createElement("div");
        holder.id = args.ID + "-wrapper";
        holder.classList.add("GUI");
        let menu = document.createElement("div");
        menu.id = args.ID + "-wrapperheader";
        menu.classList.add("GUI-menu");
        let menuLabel = document.createElement("p");
        menuLabel.classList.add("GUI-text");
        menuLabel.style.marginLeft = "5px";
        menuLabel.style.userSelect = "none";
        menuLabel.innerText = visID;
        menu.appendChild(menuLabel);
        let button = document.createElement("button");
        button.classList.add("GUI-collapse");
        button.classList.add("GUI-text");
        collapsed[args.ID] = false;
        button.onclick = function(){collapse(args.ID)};
        let close = document.createElementNS('http://www.w3.org/2000/svg', "svg");
        close.classList.add("GUI-svg");
        let line1 = document.createElementNS('http://www.w3.org/2000/svg', "line");
        line1.setAttribute('x1','1');
        line1.setAttribute('y1','5');
        line1.setAttribute('x2','9');
        line1.setAttribute('y2','5');
        line1.style.stroke = "white";
        line1.style.strokeWidth = "2px";
        line1.style.strokeLinecap = "round";
        close.appendChild(line1);
        let line2 = document.createElementNS('http://www.w3.org/2000/svg', "line");
        line2.setAttribute('x1','5');
        line2.setAttribute('y1','1');
        line2.setAttribute('x2','5');
        line2.setAttribute('y2','9');
        line2.style.stroke = "white";
        line2.style.strokeWidth = "2px";
        line2.id = args.ID + "-plus";
        line2.style.strokeLinecap = "round";
        close.appendChild(line2);
        button.appendChild(close);
        menu.appendChild(button);
        holder.appendChild(menu);
        let wrapper = document.createElement("div");
        wrapper.classList.add("GUI-wrapper");
        let column = document.createElement("div");
        column.id = args.ID + "-column";
        column.classList.add("GUI-column");
        wrapper.appendChild(column);
        holder.appendChild(wrapper);
        main.appendChild(holder);
        dragElement(document.getElementById(args.ID + "-wrapper"));
    }
  }

  //function from SharkPool's "Variables Expanded" extension
    getVariables()
    {
      const globalVars = Object.values(Scratch.vm.runtime.getTargetForStage().variables).filter((x) => x.type == "");
      const localVars = Object.values(Scratch.vm.editingTarget.variables).filter((x) => x.type == "");
      const uniqueVars = [...new Set([...globalVars, ...localVars])];
      if (uniqueVars.length === 0) return ["make a variable"];
      return uniqueVars.map((i) => (Scratch.Cast.toString(i.name)));
    }

  }

  Scratch.extensions.register(new gui());
})(Scratch);