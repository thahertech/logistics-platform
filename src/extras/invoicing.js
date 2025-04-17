import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, lineHeight: 1.5 },
  section: { marginBottom: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  text: { marginBottom: 5 },
});

const InvoicePDF = ({ invoiceData }) => {
  const { recipient_name, sender_name, price, shipment_identifier, pickup_address, delivery_address, due_date } = invoiceData;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Shipment Details</Text>
          <Text>Recipient: {recipient_name}</Text>
          <Text>Sender: {sender_name}</Text>
          <Text>Price: {price.toFixed(2)} €</Text>
          <Text>Pickup Address: {pickup_address}</Text>
          <Text>Delivery Address: {delivery_address}</Text>
          <Text>Due Date: {new Date(due_date).toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

const InvoiceComponent = ({ invoiceData }) => (

  <div>
    <h3>Invoice for Shipment: {invoiceData}</h3>
    <PDFDownloadLink document={<InvoicePDF invoiceData={invoiceData} />} fileName="invoice.pdf">
      {({ loading }) => (loading ? 'Preparing document...' : 'Download Invoice')}
    </PDFDownloadLink>
  </div>
);

export default InvoiceComponent;