const mockProducts = [
    {
      id: 1,
      name: "Kuljetuspalvelu Helsinki-Tampere",
      price: "200",
      description: "<p>Kuljetus Helsingistä Tampereelle, erikoistarjous!</p>",
      meta_data: [
        { key: "pickup_location", value: "Helsinki" },
        { key: "delivery_location", value: "Tampere" },
        { key: "pickup_date", value: "2024-11-20" },
        { key: "delivery_date", value: "2024-11-20" }
      ],
      transport_type: "auto",
      date_created: "2024-11-10"
    },
    {
      id: 2,
      name: "Kuorma-auto kuljetus Tampere-Helsinki",
      price: "350",
      description: "<p>Suuri kuorma-auto kuljetus Tampereelta Helsinkiin.</p>",
      meta_data: [
        { key: "pickup_location", value: "Tampere" },
        { key: "delivery_location", value: "Helsinki" },
        { key: "pickup_date", value: "2024-11-22" },
        { key: "delivery_date", value: "2024-11-22" }
      ],
      transport_type: "kuorma-auto",
      date_created: "2024-11-12"
    },
    {
      id: 3,
      name: "Mopo kuljetus Porista Turkuun",
      price: "100",
      description: "<p>Pieni mopo kuljetus Porista Turkuun.</p>",
      meta_data: [
        { key: "pickup_location", value: "Pori" },
        { key: "delivery_location", value: "Turku" },
        { key: "pickup_date", value: "2024-11-25" },
        { key: "delivery_date", value: "2024-11-25" }
      ],
      transport_type: "mopo",
      date_created: "2024-11-14"
    }
  ];
  