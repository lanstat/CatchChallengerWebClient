import * as GUI from 'babylonjs-gui';
import { ScrollViewer, StackPanel } from 'babylonjs-gui';

export class Chat {
    initialize() {
        let advancedTexture2 = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture2.layer.layerMask = 2;

        var panel3 = new GUI.StackPanel();
        panel3.width = "500px";
        panel3.height = '200px';
        panel3.fontSize = "14px";
        panel3.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel3.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        panel3.background = 'rgba(0,0,0,.35)';
        advancedTexture2.addControl(panel3);

        let scrollBar = new GUI.ScrollViewer();
        scrollBar.thickness = 7;
        scrollBar.color = "green";
        scrollBar.width = "400px";
        scrollBar.height = "150px";
        scrollBar.background = "black";
        scrollBar.paddingTop = "10px";
        
        
        let panelForCheckbox: GUI.StackPanel = new GUI.StackPanel();
        panelForCheckbox.isVertical = true;
        panelForCheckbox.ignoreLayoutWarnings = true;
        panelForCheckbox.color = "white";
        panelForCheckbox.height = "150px";
        panelForCheckbox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        
        this.addLine(scrollBar, 'Bienvenidos a CatchChallenger\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\nasd\n', 'white');
        panelForCheckbox.addControl(scrollBar);

        panel3.addControl(panelForCheckbox); 

        var input = new GUI.InputText();
        input.width = 1;
        input.maxWidth = 1;
        input.height = '30px';
        input.color = 'black';
        input.background = 'rgba(0,0,0,.5)';
        input.focusedBackground = 'rgba(255,255,255,.5)';
        input.focusedColor = 'rgba(255,255,255,.5)';
        input.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        input.onKeyboardEventProcessedObservable.add((evt, state) => {
            if (evt.key === 'Enter') {
                // text.text += 'lanstat: ' + input.text + '\n';
                this.addLine(scrollBar, `lanstat: ${input.text}`, 'red');
                input.text = '';
                advancedTexture2.moveFocusToControl(input);
            }
        });
        panel3.addControl(input);  

    }

    private addLine(panel: ScrollViewer, text: string, color: string) {
        let block = new GUI.TextBlock();
        block.text = text;
        block.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        block.color = color;
        panel.addControl(block);
    }
}