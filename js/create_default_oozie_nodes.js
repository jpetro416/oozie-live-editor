 //-------------------------------------------------------------
       //Auto Create Nodes
       //-------------------------------------------------------------
       function CreateOozieNodes(){
        this.email;
        this.shell;
        this.hive;
        this.pig;
        this.sqoop;
        this.distcp;
        this.decision;
        this.end_node;
        this.kill_node;

        this.getEmailNode = function(){
            return this.email;
        };


        this.getShellNode = function(){
            return this.shell;
        };

        
        this.getHiveNode = function(){
            return this.hive;
        };

        
        this.getPigNode = function(){
            return this.pig;
        };


        this.getSqoopNode = function(){
            return this.sqoop;
        };

        this.getDistcpNode = function(){
            return this.distcp;
        };

        this.getDecisionNode = function(){
            return this.decision;
        }
        this.getEndNode = function(){
            return this.end_node;
        }
        this.getKillNode = function(){
            return this.kill_node;
        }
  //--------------------------------------------
  this.setEmailNode = function(){ //email
            var email = `
<action name=\"[EMAIL-NODE]\">
<email xmlns=\"uri:oozie:email-action:0.2\">
    <to>[COMMA-SEPARATED-TO-ADDRESSES]</to>
    <cc>[COMMA-SEPARATED-CC-ADDRESSES]</cc> 
    <bcc>[COMMA-SEPARATED-BCC-ADDRESSES]</bcc> 
    <subject>[SUBJECT]</subject>
    <body>[BODY]</body>
<content_type>[CONTENT-TYPE]</content_type> 
<attachment>[COMMA-SEPARATED-HDFS-FILE-PATHS]</attachment> 
</email>
<ok to=\"[NODE-NAME]\"/>
<error to="[NODE-NAME]"/>
</action>
            `;
            this.email = email;
        };

        this.setShellNode = function(){ //shell
         var shell =  `
<action name="shell1">
<shell xmlns="uri:oozie:shell-action:0.1">
  <job-tracker>\${jobTracker}</job-tracker>
  <name-node>\${nameNode}</name-node>
  <configuration>
     <property>
        <name>mapred.job.queue.name</name>
        <value>\${queueName}</value>
     </property>
  </configuration>
  <exec>\${EXEC}</exec>
  <argument>A</argument>
  <argument>B</argument>
  <file>\${EXEC}#\${EXEC}</file>
  <!--Copy the executable to compute node's current working directory -->
</shell>
<ok to="end" />
<error to="fail" />
</action>
        `;
        this.shell = shell;
        };

        this.setHiveNode = function(){ //hive
         var hive = 
        `
<action name="myfirsthivejob">
<hive xmlns="uri:oozie:hive-action:0.2">
  <job-tracker>foo:8021</job-tracker>
  <name-node>bar:8020</name-node>
  <prepare>
     <delete path="\${jobOutput}" />
  </prepare>
  <configuration>
     <property>
        <name>mapred.compress.map.output</name>
        <value>true</value>
     </property>
  </configuration>
  <!-- <script>myscript.q</script> UNCOMMENT-->
  <param>InputDir=/home/tucu/input-data</param>
  <param>OutputDir=\${jobOutput}</param>
</hive>
<ok to="myotherjob" />
<error to="errorcleanup" />
</action>
        `;
        this.hive = hive;
    };
    this.setPigNode = function(){ //pig
         var pig = 
        `
<action name="myfirstpigjob">
<pig>
  <job-tracker>foo:9001</job-tracker>
  <name-node>bar:9000</name-node>
  <prepare>
     <delete path="\${jobOutput}" />
  </prepare>
  <configuration>
     <property>
        <name>mapred.compress.map.output</name>
        <value>true</value>
     </property>
     <property>
        <name>oozie.action.external.stats.write</name>
        <value>true</value>
     </property>
  </configuration>
  <!--  <script>/mypigscript.pig</script> UNCOMMENT-->
  <argument>-param</argument>
  <argument>INPUT=\${inputDir}</argument>
  <argument>-param</argument>
  <argument>OUTPUT=\${outputDir}/pig-output3</argument>
</pig>
<ok to="myotherjob" />
<error to="errorcleanup" />
</action>

        `;
        this.pig = pig;
    };
    this.setSqoopNode = function(){ //sqoop
         var sqoop = 
        `
<action name="myfirsthivejob">
<sqoop xmlns="uri:oozie:sqoop-action:0.2">
  <job-tracker>foo:8021</job-tracker>
  <name-node>bar:8020</name-node>
  <prepare>
     <delete path="\${jobOutput}" />
  </prepare>
  <configuration>
     <property>
        <name>mapred.compress.map.output</name>
        <value>true</value>
     </property>
  </configuration>
  <command>import  --connect jdbc:hsqldb:file:db.hsqldb --table TT --target-dir hdfs://localhost:8020/user/tucu/foo -m 1</command>
</sqoop>
<ok to="myotherjob" />
<error to="errorcleanup" />
</action>

        `;
        this.sqoop = sqoop;
    };
    this.setDistcpNode = function(){ //distcp
        var distcp =
        `
<action name="[DistCP-Node]">
<distcp xmlns="uri:oozie:distcp-action:0.2">
  <job-tracker>\${jobTracker}</job-tracker>
  <name-node>\${nameNode1}</name-node>
  <arg>\${nameNode1}/path/to/input.txt</arg>
  <arg>\${nameNode2}/path/to/output.txt</arg>
</distcp>
<ok to="[NODE-NAME]" />
<error to="[NODE-NAME]" />
</action>
        `;
        this.distcp = distcp;
    }


    this.setDecisionNode = function(){ //decision
        var decision = 
` 
<decision name="decision_node">
<switch>
  <case to="reconsolidatejob">\${fs:fileSize(secondjobOutputDir) gt 10 * GB}</case>
  <case to="rexpandjob">\${fs:fileSize(secondjobOutputDir) lt 100 * MB}</case>
  <case to="recomputejob">\${ hadoop:counters('secondjob')[RECORDS][REDUCE_OUT] lt 1000000 }</case>
  <default to="end" />
</switch>
</decision>
`;
    this.decision = decision;
    }

this.setEndNode = function(){
    var end_node =
    `
<action name="end">
<ok to="kill"/>
<error to="fail_node"/>
</action>
    `;
    this.end_node = end_node;
}
this.setKillNode = function(){
    var kill_node =
    `
<action name="kill">
<ok to="kill"/>
<error to="kill"/>
</action>
    `;
    this.kill_node = kill_node;
}
}
