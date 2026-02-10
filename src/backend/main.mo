import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization integration
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Mod Data Model
  public type Mod = {
    id : Text;
    name : Text;
    author : Text;
    version : Text;
    shortDescription : Text;
    longDescription : Text;
    tags : [Text];
    externalLinks : ?[Text];
  };

  // Persistent mod catalog
  let mods = Map.empty<Text, Mod>();

  // Persistent user library (principal -> list of mod IDs)
  let userLibraries = Map.empty<Principal, List.List<Text>>();

  // Seed initial mods
  let initialMods : [Mod] = [
    {
      id = "nocturne";
      name = "Nocturne";
      author = "Neutron";
      version = "1.0.0";
      shortDescription = "Dark mode UI overhaul for smoother navigation.";
      longDescription = "Nocturne is a dark mode theme for Geometry Dash, offering a sleek interface for night-time play. It features adjustable brightness, high-contrast elements, and improved visibility for prolonged sessions.";
      tags = ["theme", "ui", "high-light"];
      externalLinks = ?["https://geode.nocturne.mod"];
    },
    {
      id = "gdobserver";
      name = "GD Observer";
      author = "Boltstorm";
      version = "2.0.0";
      shortDescription = "Adds advanced analytics and practice mode tools.";
      longDescription = "GD Observer offers in-depth analytics for your gameplay, customizable practice checkpoints, and tools to analyze jump timings. Enhance your skills, track improvements, and optimize your playstyle.";
      tags = ["analytics", "practice-mode", "tools"];
      externalLinks = ?["https://gdobserver.tools"];
    },
    {
      id = "fragility";
      name = "Fragility";
      author = "Banana";
      version = "0.9.1";
      shortDescription = "Adds fragile block mechanic for new level experiences.";
      longDescription = "Fragility introduces a unique challenge to Geometry Dash with blocks that break after a single touch. It comes with a level editor extension and a new array of custom difficulty tiers.";
      tags = ["gameplay", "mechanics", "fragile-block"];
      externalLinks = ?["https://fragility.mod.io"];
    },
  ];

  // Seed mods on actor initialization
  for (mod in initialMods.vals()) {
    mods.add(mod.id, mod);
  };

  // User Profile type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Add library entry for caller
  public shared ({ caller }) func addToLibrary(modId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to library");
    };

    switch (mods.get(modId)) {
      case (null) {
        Runtime.trap("Mod not found");
      };
      case (?_mod) {
        let currentLibrary = switch (userLibraries.get(caller)) {
          case (null) { List.empty<Text>() };
          case (?existing) { existing };
        };
        if (currentLibrary.contains(modId)) {
          Runtime.trap("Mod is already in your library");
        };
        currentLibrary.add(modId);
        userLibraries.add(caller, currentLibrary);
      };
    };
  };

  // Remove library entry for caller
  public shared ({ caller }) func removeFromLibrary(modId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from library");
    };

    switch (userLibraries.get(caller)) {
      case (?library) {
        if (not library.contains(modId)) {
          Runtime.trap("Mod not found in your library");
        };
        let newLibrary = library.filter(func(id) { id != modId });
        userLibraries.add(caller, newLibrary);
      };
      case (null) {
        Runtime.trap("Library not found");
      };
    };
  };

  // Get all mods in the caller library
  public query ({ caller }) func getMyLibrary() : async [Mod] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their library");
    };

    let interpretations = switch (userLibraries.get(caller)) {
      case (?library) {
        library.map<Text, ?Mod>(func(modId) { mods.get(modId) });
      };
      case (null) {
        List.empty<(?Mod)>();
      };
    };

    interpretations.filterMap<?Mod, Mod>(
      func(opt) {
        switch (opt) {
          case (null) { null };
          case (?mod) { ?mod };
        };
      }
    ).toArray();
  };

  // Get all mods in the catalog (public, no authentication required)
  public query func getAllMods() : async [Mod] {
    mods.values().toArray();
  };

  // Get mod by id (public, no authentication required)
  public query func getMod(modId : Text) : async ?Mod {
    mods.get(modId);
  };
};
