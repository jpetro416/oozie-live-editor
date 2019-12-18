function OozieNode() {  
    this.node_id = "";  
    this.previous_node = "";  
    this.next_node = "";   
    this.first_node = false;  
    this.node_number = 0;
    this.error_node = "";
    this.primary_error_node = false;
    this.decision_node = false;
    this.decision_default_next_node = "";   
    this.decision_case_nodes = [];
    this.default_node_structure = null;
    this.first_node_structure;
    this.error_node_structure = null;
    this.error_node_structure_for_error_graph = "";
    this.default_node_structure_for_error_graph = "";

    

    //getters
     this.getNodeID  = function() {  
           return this.node_id;  
     };
     this.getPreviousNode = function() {  
           return this.previous_node;  
     };
     this.getNextNode = function() {  
           return this.next_node;  
     };
     this.getIsFirstNode = function() {  
           return this.first_node;  
     };
 
     this.getNodeNumber = function(){
         return this.node_number;
     };

     this.getErrorNode = function(){
         return this.error_node;
     };

     this.isPrimaryErrorNode = function(){
         return this.primary_error_node;
     };

     this.isDecisionNode = function(){
         return this.decision_node;
     };

     this.getDecisionDefaultNextNode = function(){
         return this.decision_default_next_node;
     };

     this.getDecisionCaseNodesList = function(){
         return this.decision_case_nodes;
     };
     this.getDefaultNodeStructure = function(){
         return this.default_node_structure;
     };
     this.getFirstNodeStructure = function(){
         this.setFirstNodeStructure();
         return this.first_node_structure;
     };
     this.getFirstNodeStructure = function(){
        return this.first_node_structure;
    }; 
    this.getErrorNodeStructure = function(){
        return this.error_node_structure;
    } 

   //-------------------------------------------
   //Return a default pathing structure for mermaid js diagrams when there is an error in the structure
   //-------------------------------------------
    this.getDefaultNodeStructure = function(){
        return this.default_node_structure;
    };
  
    this.getErrorNodeStructureForErrorGraph = function(){
        return this.error_node_structure_for_error_graph;
    };

    this.getDefaultNodeStructureForErrorGraph  = function(){
        return this.default_node_structure_for_error_graph;
    };

    //setters
     this.setNodeID = function(node_id){
         this.node_id = node_id.replace(/\s+/g, '_'); //change spaces to underscores... mermaid doesn't like spaces...;
     };
     this.setPreviousNode = function(previous_node){
         this.previous_node = previous_node.replace(/\s+/g, '_');
     };
     this.setNextNode = function(next_node){
         this.next_node = next_node.replace(/\s+/g, '_');
         this.setDefaultNodeStructure(); //set a new node structure whenever a next node is set
         this.setDefaultNodeStructureForErrorGraph();
     };
     this.setIsFirstNode = function(first_node){
         this.first_node = first_node; 
     };
     
     this.setNodeNumber = function(node_number){
         this.node_number = node_number;
     };

     this.setErrorNode = function(error_node){
         this.error_node = error_node.replace(/\s+/g, '_');
         this.setErrorNodeStructure(); //set a new error node structure whenever a next node is set
         this.setErrorNodeStructureForErrorGraph();
     };

     this.setPrimaryErrorNode = function(primary_error_node){
         this.primary_error_node = primary_error_node;
     };

     this.setDecisionNode = function(decision_node){
         this.decision_node = decision_node;
     };
     this.setDecisionDefaultNextNode = function(decision_default_next_node){
         this.decision_default_next_node = decision_default_next_node.replace(/\s+/g, '_');
     };
     this.setDecisionCaseNodesList = function(incoming_case){
         this.decision_case_nodes.push(incoming_case.replace(/\s+/g, '_'));
     };
     
     //create a default pathing structure for mermaid js diagrams
     this.setDefaultNodeStructure = function(){
        this.default_node_structure = this.getNodeID() + " --> " + this.getNextNode() + " "; //space neeeded
     }; 
     this.setFirstNodeStructure = function(){
        this.first_node_structure = " [*] --> " + this.getNodeID() + this.getErrorNode() + " ";//space needed
     };
     this.setErrorNodeStructure = function(){
         this.error_node_structure = this.getNodeID() + " --> " + this.getErrorNode() + " ";//space needed
     }
   //-------------------------------------------
   //create a default pathing structure for mermaid js diagrams when there is an error in the structure
   //-------------------------------------------
    this.setDefaultNodeStructureForErrorGraph = function(){
        var tmp_string_builder = "";
        if(this.getNodeID().includes("end")){//current node name includes end
            tmp_string_builder += this.getNodeID().replace(/end/g, 'endlabel[end]') + " --> ";
            }else{
            tmp_string_builder += this.getNodeID() + " --> ";
            }
        if(this.getNextNode() !=null && this.getNextNode().includes("end")){ //next node includes end
            this.default_node_structure_for_error_graph = tmp_string_builder + this.getNextNode().replace(/end/g, 'endlabel[end] '); //space neeeded;
        }else{
            this.default_node_structure_for_error_graph = tmp_string_builder + this.getNextNode().replace('end', 'endlabel[end] ')//space neeeded
        }
    }; 

     this.setErrorNodeStructureForErrorGraph = function(){
        var tmp_string_builder = "";
        if(this.getNodeID().includes("end")){//current error node name includes end
            tmp_string_builder += this.getNodeID().replace(/end/g, 'endlabel[end]') + " --> ";
            }else{
            tmp_string_builder += this.getNodeID() + " --> ";
            }
        if(this.getNextNode() !=null && this.getErrorNode().includes("end")){
        this.error_node_structure_for_error_graph = tmp_string_builder + this.getErrorNode() + "label[end]";//space needed
        }else{
        this.error_node_structure_for_error_graph = tmp_string_builder + this.getErrorNode() + " ";//space needed
        }
     
    };

     
 
     this.printNodeInfo = function(){
         console.log(
                " getNodeID: " + this.getNodeID(),
             "\n getIsFirstNode: " + this.getIsFirstNode(),
             "\n getPreviousNode: " + this.getPreviousNode(),
             "\n getNextNode: " + this.getNextNode(),
             "\n getNodeNumber: " + this.getNodeNumber(),
             "\n getErrorNode: " + this.getErrorNode(),
             "\n isPrimaryErrorNode: " + this.isPrimaryErrorNode(),
             "\n isDecisionNode: " + this.isDecisionNode(),
             "\n getDecisionDefaultNextNode: " + this.getDecisionDefaultNextNode(),
             "\n getDecisionCaseNodesList: " + this.getDecisionCaseNodesList().length
             );
         for(let i=0; i < this.getDecisionCaseNodesList().length; i++){
             console.log("Decision Node #"+i + ": " + this.decision_case_nodes[i]);
         }
     };
 } //----------------------------------------------------End class OozieNode
