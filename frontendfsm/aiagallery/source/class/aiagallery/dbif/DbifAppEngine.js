/**
 * Copyright (c) 2011 Derrell Lipman
 * 
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html 
 *   EPL : http://www.eclipse.org/org/documents/epl-v10.php
 */

qx.Class.define("aiagallery.dbif.DbifAppEngine",
{
  extend  : rpcjs.appengine.Dbif,
  type    : "singleton",

  include : 
  [
    aiagallery.dbif.MDbifCommon
  ],
  
  construct : function()
  {
    // Call the superclass constructor
    this.base(arguments, "aiagallery", "/rpc");
  },
  
  members :
  {
    identify : function()
    {
      var             UserServiceFactory;
      var             userService;
      var             user;
      var             whoami;
      var             userId;

      // Find out who is logged in
      UserServiceFactory =
        Packages.com.google.appengine.api.users.UserServiceFactory;
      userService = UserServiceFactory.getUserService();
      user = userService.getCurrentUser();
      whoami = String(user.getEmail());
      userId = String(user.getUserId());

      // Save the logged-in user. The whoAmI property is in MDbifCommon.
      this.setWhoAmI(
        {
          email     : whoami,
          userId    : userId,
          isAdmin   : userService.isUserAdmin(),
          logoutUrl : userService.createLogoutURL("/")
        });
    }
  },

  defer : function()
  {
    // Register our put & query functions
    rpcjs.dbif.Entity.registerDatabaseProvider(
      rpcjs.appengine.Dbif.query,
      rpcjs.appengine.Dbif.put,
      rpcjs.appengine.Dbif.remove);
  }
});
