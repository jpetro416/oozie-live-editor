function OozieNode() {  
    this.node_id = "";  
    this.previous_node = "";  
    this.next_node = "";   
    this.first_node = false;  
    this.node_number = 0;
    this.error_node = null;
    this.primary_error_node = false;
    this.decision_node = false;
    this.decision_default_next_node = "";   
    this.decision_case_nodes = [];
     
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
     
      
     this.setNodeID = function(node_id){
         this.node_id = node_id;
     };
     this.setPreviousNode = function(previous_node){
         this.previous_node = previous_node;
     };
     this.setNextNode = function(next_node){
         this.next_node = next_node;
     };
     this.setIsFirstNode = function(first_node){
         this.first_node = first_node;
     };
     
     this.setNodeNumber = function(node_number){
         this.node_number = node_number;
     };

     this.setErrorNode = function(error_node){
         this.error_node = error_node;
     };

     this.setPrimaryErrorNode = function(primary_error_node){
         this.primary_error_node = primary_error_node;
     };

     this.setDecisionNode = function(decision_node){
         this.decision_node = decision_node;
     };
     this.setDecisionDefaultNextNode = function(decision_default_next_node){
         this.decision_default_next_node = decision_default_next_node;
     };
     this.setDecisionCaseNodesList = function(incoming_case){
         this.decision_case_nodes.push(incoming_case);
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