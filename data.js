/* ============================================================
   Remote Wave Centre — catalogue data
   ------------------------------------------------------------
   The catalogue is generated from brand/model tables so it stays
   small on disk while covering a very wide range of remotes and
   remote covers.

   PRICING: every generated product has a `price` field that is
   currently `null`. While it is null the UI shows "Price on
   request" plus the contact number. To put a price on anything,
   set `price` to a number (e.g. 149) or a string ("R149.00") —
   either on a single product in `overrides`, or globally by
   handing a price table to `buildCatalog`.
   ============================================================ */

window.RWC = (function () {
  "use strict";

  var CONTACT = {
    name: "Remote Wave Centre",
    phoneDisplay: "074 050 8902",
    phone: "0740508902",
    phoneIntl: "+27740508902",
    whatsapp: "27740508902",
    email: "sales@remotewavecentre.co.za",
    hours: "Mon–Sat, 08:00–18:00",
    area: "Nationwide delivery across South Africa"
  };

  /* ---- Category tables: brand -> list of models ---- */

  var CATEGORIES = [
    {
      id: "tv",
      name: "TV Remote",
      blurb: "Smart, LED, QLED, OLED, plasma and CRT replacements",
      brands: {
        "Samsung": ["BN59-01315 Smart TV", "BN59-01199 Crystal UHD", "BN59-01363 QLED", "TM2280 Neo QLED", "The Frame 2021–2024", "Series 4/5/6/7/8", "Plasma & LCD legacy"],
        "LG": ["AKB75095307 OLED", "MR21GA Magic Remote", "AKB73715601 Smart TV", "NanoCell / QNED", "LCD & Plasma legacy"],
        "Sony": ["Bravia X80/X90 Google TV", "RMF-TX500E Smart", "Bravia A80 OLED", "KD / KDL legacy"],
        "Hisense": ["EN2Q27H Vidaa U6/U7", "ERF3I80H Smart", "EN2B27H A6 Series", "LED legacy"],
        "TCL": ["Google TV RC802N", "Roku TV RC280", "S/P/C Series", "LED legacy"],
        "Panasonic": ["Viera N2QAYB", "TX Smart Series", "Plasma legacy"],
        "Philips": ["Smart TV 9965 Series", "LED 5000 Series"],
        "Sharp": ["Aquos LC Smart", "LED legacy"],
        "Toshiba": ["Regza Smart TV", "LED legacy"],
        "JVC": ["Smart LED Series", "CRT legacy"],
        "Sinotec": ["Smart LED Series", "Entry LED"],
        "Telefunken": ["Smart Series", "LED legacy"],
        "Skyworth": ["Android TV Smart", "LED legacy"],
        "Coocaa": ["Smart TV Series", "LED legacy"],
        "Aiwa": ["Smart TV Series"],
        "Sansui": ["Smart TV Series", "LED legacy"],
        "Changhong": ["Smart LED Series"],
        "Haier": ["Smart TV Series"],
        "Matrix": ["Smart TV Series"],
        "BPL": ["LED legacy"],
        "Mecer": ["Smart Display Remote"],
        "Nexus": ["Smart TV Series"],
        "Amoi": ["LED legacy"],
        "Sinclair": ["Smart Series"]
      }
    },
    {
      id: "ac",
      name: "Air Conditioner Remote",
      blurb: "Split, inverter, cassette and portable AC controllers",
      brands: {
        "LG": ["AKB74955603 Inverter", "AKB73757604 Dual Cool", "Ducted / Cassette"],
        "Samsung": ["ARH-1391 Inverter", "DB93-11115 Wind-Free", "Cassette"],
        "Daikin": ["ARC433B Inverter", "ARC470A Split"],
        "Midea": ["RG52D/BGE Inverter", "RG10 Split"],
        "Gree": ["YAP1F1 Inverter", "YAA1FB Split"],
        "Hisense": ["EN2A27H Inverter", "Split Series"],
        "TCL": ["TAC Inverter", "Split Series"],
        "Carrier": ["RG66 Inverter", "Split Series"],
        "Fujitsu": ["AR-RAH1E Inverter"],
        "Panasonic": ["CWA75C4267 Inverter"],
        "Mitsubishi": ["MSZ Inverter"],
        "Defy": ["Split Series"],
        "Voltas": ["Inverter Series"],
        "Bruhm": ["Split Series"],
        "Chigo": ["Inverter Series"],
        "AUX": ["Split Series"],
        "Haier": ["Inverter Series"],
        "Kelvinator": ["Split Series"],
        "Airwell": ["Split Series"],
        "Toshiba": ["Inverter Series"],
        "Samsung WindFree": ["ARH-1827"]
      }
    },
    {
      id: "soundbar",
      name: "Soundbar & Home Theatre",
      blurb: "Soundbars, AV receivers and home theatre systems",
      brands: {
        "Samsung": ["HW Series Soundbar", "Q-Series Atmos"],
        "LG": ["SN Series Soundbar", "S-Series Soundbar"],
        "Sony": ["HT Series Soundbar", "BDV Home Theatre"],
        "JBL": ["Bar Series", "Cinema Series"],
        "Hisense": ["HS Series Soundbar"],
        "TCL": ["TS Series Soundbar"],
        "Yamaha": ["YAS Series", "AV Receiver"],
        "Bose": ["Soundbar Series", "Wave Music System"],
        "Polk": ["Signa Soundbar"],
        "Sinotec": ["Soundbar Series"],
        "Amtec": ["Home Theatre Series"],
        "Ultimate Ears": ["Party Speaker Remote"]
      }
    },
    {
      id: "dstv",
      name: "DSTV & Set-Top Box",
      blurb: "Decoders, streaming boxes and pay-TV controllers",
      brands: {
        "DSTV": ["Explora 2A/3A", "HD PVR 2P/4P", "HD Decoder 5 Series", "Streama", "B4/B5 Decoder"],
        "OpenView": ["HD Decoder", "OVHD Series"],
        "StarSat": ["SR-2000HD", "HD Decoder"],
        "Zapper": ["Box Remote"],
        "Apple TV": ["Siri Remote 1st/2nd Gen"],
        "Xiaomi": ["Mi Box S / 4K"],
        "Amazon": ["Fire TV Stick Remote", "Fire TV Cube Remote"],
        "Roku": ["Express / Streaming Stick"],
        "Google": ["Chromecast with Google TV"],
        "Telkom": ["LIT Box"],
        "Netflix Box": ["Streaming Box"]
      }
    },
    {
      id: "projector",
      name: "Projector",
      blurb: "Home cinema and office projector controllers",
      brands: {
        "Epson": ["EB / EH Series", "Home Cinema Series"],
        "BenQ": ["MS / MX Series", "W Series"],
        "ViewSonic": ["PA / PX Series"],
        "Optoma": ["HD / UHD Series"],
        "Acer": ["X / H Series"],
        "Panasonic": ["PT Series"],
        "Xgimi": ["Halo / Horizon"],
        "Anker": ["Nebula Series"]
      }
    },
    {
      id: "cctv",
      name: "CCTV & DVR",
      blurb: "Recorders, NVRs and surveillance system remotes",
      brands: {
        "Hikvision": ["DVR / NVR Series"],
        "Dahua": ["XVR / NVR Series"],
        "Swann": ["DVR Series"],
        "Uniview": ["NVR Series"],
        "Reolink": ["NVR Series"],
        "EZVIZ": ["X5 / X7 Series"],
        "Sannce": ["DVR Series"]
      }
    },
    {
      id: "fan",
      name: "Fan & Light",
      blurb: "Ceiling fan, pedestal and light switch controllers",
      brands: {
        "Universal": ["Ceiling Fan 3-Speed", "Pedestal Fan"],
        "Brayt": ["Ceiling Fan Remote"],
        "Solar": ["DC Fan Remote"],
        "Havells": ["Ceiling Fan Remote"],
        "Anko": ["Fan & Light Remote"],
        "LED": ["RGB Light Controller"]
      }
    },
    {
      id: "gate",
      name: "Gate & Garage",
      blurb: "Gate motors, garage doors and rolling-code remotes",
      brands: {
        "Centurion": ["Nova / G-Series", "SDO4 Garage"],
        "Centsys": ["Nova Blue / Black"],
        "ET Nice": ["Blue / Grey / Mhouse"],
        "Digidoor": ["3 / 6 Series"],
        "Roll-A-Way": ["Garage Door Remote"],
        "Marantec": ["Digital Series"],
        "Chamberlain": ["Garage Master"],
        "DACE": ["Gate Motor Remote"],
        "Gemini": ["Garage Remote"],
        "Sommer": ["Garage Remote"],
        "Came": ["Gate Remote"]
      }
    },
    {
      id: "music",
      name: "Music & Hi-Fi",
      blurb: "Mini Hi-Fi, speaker and amplifier remotes",
      brands: {
        "Sony": ["MHC / LBT Series"],
        "LG": ["CM / XBoom Series"],
        "Samsung": ["MX / HT Series"],
        "Philips": ["FWM Series"],
        "JVC": ["MX / UX Series"],
        "Panasonic": ["SC Series"],
        "Amtec": ["Hi-Fi Series"]
      }
    },
    {
      id: "universal",
      name: "Universal & Smart",
      blurb: "One-for-all remotes, learning remotes and IR blasters",
      brands: {
        "Universal": ["2-in-1 TV/AC", "3-in-1 TV/AC/STB", "10-in-1 Big Button", "Universal AC Remote"],
        "Smart": ["Wi-Fi IR Blaster", "Bluetooth Voice Remote", "Learning Remote RM4"],
        "Replacement": ["Slim Universal TV", "Mini Keychain Remote"]
      }
    }
  ];

  /* ---- Cover ranges applied to every brand in a category ---- */

  var COVER_TYPES = [
    { id: "silicone", name: "Silicone Sleeve", blurb: "Soft-touch, anti-slip grip" },
    { id: "tpu", name: "Clear TPU Case", blurb: "Slim crystal-clear protection" },
    { id: "shock", name: "Shockproof Case", blurb: "Drop-resistant and kid-proof" },
    { id: "glow", name: "Glow-in-the-Dark Sleeve", blurb: "Find it without the light" },
    { id: "waterproof", name: "Waterproof Pouch", blurb: "Splash and dust sealed" },
    { id: "cradle", name: "Wall Cradle & Holder", blurb: "Park it where you need it" }
  ];

  /* Which cover ranges suit which category. */
  var COVER_MATRIX = {
    tv: ["silicone", "tpu", "shock", "glow", "cradle"],
    ac: ["silicone", "tpu", "shock", "cradle"],
    soundbar: ["silicone", "tpu", "shock", "waterproof", "cradle"],
    dstv: ["silicone", "tpu", "shock", "glow"],
    projector: ["silicone", "tpu", "shock"],
    cctv: ["silicone", "tpu"],
    fan: ["silicone", "shock", "cradle"],
    gate: ["silicone", "shock", "waterproof", "cradle"],
    music: ["silicone", "tpu", "shock"],
    universal: ["silicone", "tpu", "shock", "glow"]
  };

  /* Optional per-product edits. Key is any unique substring of the
     generated product name; value is a partial object to merge.

     Supported keys: price, badge, image, blurb.

     Give an item a real photo by pointing `image` at a file you add to
     assets/photos/ — the card uses it instead of the built-in artwork.

     Examples (remove the leading slashes once you have the values):
  */
  var overrides = {
    // "Samsung BN59-01315": { price: 149, badge: "Best seller" },
    // "DSTV Explora":        { price: "R299.00" },
    // "Daikin ARC433B":      { image: "assets/photos/daikin-arc433b.jpg" },
    // "Centurion Nova":      { image: "assets/photos/centurion-nova.jpg", price: 249 }
  };

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function findOverride(name) {
    var key;
    for (key in overrides) {
      if (overrides.hasOwnProperty(key) && name.indexOf(key) !== -1) {
        return overrides[key];
      }
    }
    return null;
  }

  /* Build the full catalogue. Returns an array of products:
     { id, name, brand, category, categoryId, type, code, price, blurb, badge } */
  function buildCatalog(options) {
    var opts = options || {};
    var priceTable = opts.prices || {};
    var items = [];

    CATEGORIES.forEach(function (cat) {
      Object.keys(cat.brands).forEach(function (brand) {
        /* Remotes */
        cat.brands[brand].forEach(function (model) {
          var name = brand + " " + model;
          var p = {
            id: slug("remote " + name),
            name: name + " Remote",
            brand: brand,
            category: cat.name,
            categoryId: cat.id,
            type: "remote",
            code: "RWC-" + (cat.id.toUpperCase()) + "-" + slug(model).slice(0, 14).toUpperCase(),
            price: null,
            blurb: cat.blurb,
            badge: ""
          };
          items.push(applyEdits(p, priceTable));
        });

        /* Covers */
        var ranges = COVER_MATRIX[cat.id] || ["silicone"];
        ranges.forEach(function (coverId) {
          var cover = COVER_TYPES.filter(function (c) { return c.id === coverId; })[0];
          if (!cover) return;
          var name = brand + " " + cover.name;
          var p = {
            id: slug("cover " + name + " " + cat.id),
            name: cover.name + " for " + brand + " " + cat.name,
            brand: brand,
            category: cat.name,
            categoryId: cat.id,
            type: "cover",
            code: "RWC-C-" + (cat.id.toUpperCase()) + "-" + cover.id.slice(0, 6).toUpperCase(),
            price: null,
            blurb: cover.blurb,
            badge: ""
          };
          items.push(applyEdits(p, priceTable));
        });
      });
    });

    /* De-duplicate by id, keeping the first occurrence. */
    var seen = {};
    return items.filter(function (p) {
      if (seen[p.id]) return false;
      seen[p.id] = true;
      return true;
    });
  }

  function applyEdits(product, priceTable) {
    var edited = findOverride(product.name);
    if (edited) {
      Object.keys(edited).forEach(function (k) { product[k] = edited[k]; });
    }
    if (product.price == null && priceTable[product.categoryId] != null) {
      product.price = priceTable[product.categoryId];
    }
    return product;
  }

  return {
    contact: CONTACT,
    categories: CATEGORIES,
    coverTypes: COVER_TYPES,
    buildCatalog: buildCatalog
  };
})();
