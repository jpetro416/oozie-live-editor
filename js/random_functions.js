

        //random color generator
        function randomDAGColor () {
            var rando_num = Math.floor(Math.random() * 6) + 1
            if(rando_num == 1){
                return "lightblue";
            }else if(rando_num == 2){
                return "lightgreen";
            }else if(rando_num == 3){
                return "orange";
            }else if(rando_num == 4){
                return "lightgreen";
            }else if(rando_num == 5){
                return "pink";
            }else{
                return "lightblue";
            }
        }

        //random number generator
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        //logger
        function alertOrConsole(node, flag){
        if(flag){
            alert(node);
        }else{
            console.log("----------------");
            console.log(node);
        }
        }
  
        //save to file
        function exportXMLToFile(){
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(updated_copy_of_text_area));
            pom.setAttribute('download', "workflow.xml");

            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                pom.dispatchEvent(event);
            }
            else {
                pom.click();
            }
        }

            //about
            function aboutOLE(){
                alert("Version: 1.1.1\nSoftware Created by: Joseph Petro\nPlease visit gojs.net to purchase a license for Go.JS");
            }

            function docReady(fn) {
                // see if DOM is already available
                if (document.readyState === "complete" || document.readyState === "interactive") {
                    // call on next available tick
                    setTimeout(fn, 1);
                } else {
                    document.addEventListener("DOMContentLoaded", fn);
                }
            }

            function consoleCleanup(){
            if(console._commandLineAPI && console._commandLineAPI.clear){
                console._commandLineAPI.clear();//clear in some safari versions
            }else if(console._inspectorCommandLineAPI && console._inspectorCommandLineAPI.clear){
                console._inspectorCommandLineAPI.clear();//clear in some chrome versions
            }else if(console.clear){
                console.clear();//clear in other chrome versions (maybe more browsers?)
            }else{
                console.log(Array(100).join("\n"));//print 100 newlines if nothing else works
            }
        }

        function insertAtCursor(myField, myValue) {
            //IE support
            if (document.selection) {
                myField.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
            }
            // Microsoft Edge
            else if(window.navigator.userAgent.indexOf("Edge") > -1) {
            var startPos = myField.selectionStart; 
            var endPos = myField.selectionEnd; 

            myField.value = myField.value.substring(0, startPos)+ myValue 
                    + myField.value.substring(endPos, myField.value.length); 

            var pos = startPos + myValue.length;
            myField.focus();
            myField.setSelectionRange(pos, pos);
            }
            //MOZILLA and others
            else if (myField.selectionStart || myField.selectionStart == '0') {
                var startPos = myField.selectionStart;
                var endPos = myField.selectionEnd;
                myField.value = myField.value.substring(0, startPos)
                    + myValue
                    + myField.value.substring(endPos, myField.value.length);
            } else {
                myField.value += myValue;
            }
            triggerEvent(myField,'input');
        }

            function triggerEvent(el, type){
            if ('createEvent' in document) {
                // modern browsers, IE9+
                var e = document.createEvent('HTMLEvents');
                e.initEvent(type, false, true);
                el.dispatchEvent(e);
            } else {
                // IE 8
                var e = document.createEventObject();
                e.eventType = type;
                el.fireEvent('on'+e.eventType, e);
            }
            }
       
        // ================================================================================
        // Clipboard
        // ================================================================================
        function copyToClipboard(text,type_of_node) {
            var hold_base_txt = text;
            var selected = false;
            var el = document.createElement('textarea');      // Create temp element off-screen to hold text.
            var oozie_node_spawn    = new CreateOozieNodes();
            if(type_of_node=="email_node_create_btn"){
                oozie_node_spawn.setEmailNode();
                text = oozie_node_spawn.getEmailNode(); 
             }else  if(type_of_node=="shell_node_create_btn"){ //TODO
                oozie_node_spawn.setShellNode();
                text = oozie_node_spawn.getShellNode(); 
             } else  if(type_of_node=="hive_node_create_btn"){ //TODO
                oozie_node_spawn.setHiveNode();
                text = oozie_node_spawn.getHiveNode(); 
             } 
             else  if(type_of_node=="pig_node_create_btn"){ //TODO
                oozie_node_spawn.setPigNode();
                text = oozie_node_spawn.getPigNode(); 
             } else  if(type_of_node=="sqoop_node_create_btn"){ //TODO
                oozie_node_spawn.setSqoopNode();
                text = oozie_node_spawn.getSqoopNode(); 
             }  else  if(type_of_node=="distcp_node_create_btn"){ //distcp
                oozie_node_spawn.setDistcpNode();
                text = oozie_node_spawn.getDistcpNode(); 
             } else  if(type_of_node=="decision_node_create_btn"){ //decision
                oozie_node_spawn.setDecisionNode();
                text = oozie_node_spawn.getDecisionNode(); 
             } 
             else  if(type_of_node=="end_node_create_btn"){ //end
                oozie_node_spawn.setEndNode();
                text = oozie_node_spawn.getEndNode(); 
             } 
             else  if(type_of_node=="kill_node_create_btn"){ //kill
                oozie_node_spawn.setKillNode();
                text = oozie_node_spawn.getKillNode(); 
             } 
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            if (document.getSelection().rangeCount > 0) {
                selected = document.getSelection().getRangeAt(0)
            }
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            if (selected) {
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
            }
             // give some visual feadback
            var toaster = document.getElementById("snackbar");
            toaster.textContent = hold_base_txt +" node copied to clipboard";
            toaster.className = "show";
            setTimeout(function(){ toaster.className = toaster.className.replace("show", ""); }, 5000);
        
        };