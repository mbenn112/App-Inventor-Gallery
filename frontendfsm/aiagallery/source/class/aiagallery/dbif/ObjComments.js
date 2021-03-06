/**
 * Copyright (c) 2011 Derrell Lipman
 * Copyright (c) 2011 Reed Spool
 * 
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html 
 *   EPL : http://www.eclipse.org/org/documents/epl-v10.php
 */

qx.Class.define("aiagallery.dbif.ObjComments",
{
  extend : aiagallery.dbif.Entity,
  
  construct : function(uid)
  {
    // Pre-initialize the data
    this.setData(
      {
        "timestamp"  : (new Date()).toString(),
        "numChildren": 0
      });

    // Call the superclass constructor
    this.base(arguments, "comments", uid);
  },
  
  defer : function(clazz)
  {
    aiagallery.dbif.Entity.registerEntityType(clazz.classname, "comments");
    
    var databaseProperties =
      {
        /** UID of the AppData object which was commented upon */
        "app" : "Key",

        /*
         * Hierarchy identifier to track comment threads. 
         *
         * See http://www.tetilab.com/roberto/pgsql/postgres-trees.pdf for an
         * explanation of the Genealogical Representation of Trees in
         * Databases which is being used here.  Note that we use fgID
         * representation, with 4 bytes per level, so we can represent 6.5E+08
         * direct replies to a single comment, which should be adequate for
         * our purposes. :-)
         */
        "treeId" : "String",
        
        /** How many direct responses does this comment have? */
        "numChildren" : "Integer",

        /** Id of the Visitor who made this comment */
        "visitor" : "String",

        /** Time the comment was made */
        "timestamp" : "String",

        /** Text of this comment */
        "text" : "String"
      };

    // Register our property types
    aiagallery.dbif.Entity.registerPropertyTypes("comments",
                                                 databaseProperties);
  }
});
