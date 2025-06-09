// src/components/InvoiceDocument.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import logo from "../assets/images/logo2.png";
import qrCode from "../assets/images/qrcode.png";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 20, fontWeight: "bold" },
  section: { marginVertical: 10 },
  label: { fontWeight: "bold" },
  table: { display: "table", width: "auto", marginVertical: 10 },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "25%",
    borderBottom: 1,
    padding: 4,
    backgroundColor: "#eee",
    fontWeight: "bold",
  },
  tableCol: { width: "25%", borderBottom: 1, padding: 4 },
  terms: { marginTop: 20, fontSize: 8 },
  bullet: { marginLeft: 10 },

  signatureContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signatureBox: {
    width: 200,
    height: 20,
    borderBottom: 1,
    marginTop: 10,
  },
  qrCode: {
    width: 80,
    height: 80,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
  weigth: {
    fontWeight: "bold",
  },
});

const InvoiceDocument = ({ order }) => {
  const subTotal = order.itemDetail.reduce(
    (prev, curr) => prev + (curr.total + curr.total * 0.3),
    0
  );
  let discount = 0;
  order.itemDetail.forEach((disc) => {
    discount += disc?.total * 0.3;
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>
              <Text style={styles.weigth}>Invoice No:</Text> #{order?.orderNo}
            </Text>
            <Text>
              <Text style={styles.weigth}>Issue Date:</Text>{" "}
              {new Date(order?.date).toLocaleDateString()}
            </Text>
            <Text>
              <Text style={styles.weigth}>Expiry Date:</Text>{" "}
              {new Date(order?.date).toLocaleDateString()}
            </Text>
          </View>
          <Image src={logo} style={{ width: 100, height: 100 }} />
        </View>

        {/* Bill To / Payment Info */}
        <View style={[styles.row, styles.section]}>
          <View>
            <Text style={styles.label}>Bill To:</Text>
            <Text>
              <Text style={styles.weigth}>Name:</Text>{" "}
              {order?.customerDetail.firstName} {order?.customerDetail.lastName}
            </Text>
            <Text>
              <Text style={styles.weigth}>Address:</Text>{" "}
              {order?.customerDetail.address}
            </Text>
            <Text>
              {order?.customerDetail.state}, {order?.customerDetail.country}
            </Text>
            <Text>
              <Text style={styles.weigth}>Phone:</Text>{" "}
              {order?.customerDetail.phone}
            </Text>
            <Text>
              <Text style={styles.weigth}>Email:</Text>{" "}
              {order?.customerDetail.email}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Payment Info:</Text>
            <Text>
              <Text style={styles.weigth}>Method:</Text> Cash On Delivery
            </Text>
            <Text>
              <Text style={styles.weigth}>Total:</Text> Rs.{order?.totalAmount}
            </Text>
          </View>
        </View>

        {/* Product Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Product</Text>
            <Text style={styles.tableColHeader}>Quantity</Text>
            <Text style={styles.tableColHeader}>Unit Price</Text>
            <Text style={styles.tableColHeader}>Total</Text>
          </View>
          {order?.itemDetail?.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCol}>{item.title}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>
                Rs.{item.total / item.quantity}
              </Text>
              <Text style={styles.tableCol}>
                Rs.{item.total + item.total * 0.3}
              </Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={[styles.tableCol, styles.weigth]}>Subtotal</Text>
            <Text style={[styles.tableCol, styles.weigth]}>Rs.{subTotal}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={[styles.tableCol, styles.weigth]}>Discount</Text>
            <Text style={[styles.tableCol, styles.weigth]}>Rs.{discount}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}></Text>
            <Text style={[styles.tableCol, styles.weigth]}>Total</Text>
            <Text style={[styles.tableCol, styles.weigth]}>
              Rs.{order.totalAmount}
            </Text>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <Text>
            Thank you for using our services. Give your feedback below:
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={require("../assets/images/star.png")}
                style={{ width: 12, height: 12, marginRight: 2 }}
              />
            ))}
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.terms}>
          <Text style={styles.label}>Terms and Conditions:</Text>
          <Text style={styles.bullet}>• One year warranty.</Text>
          <Text style={styles.bullet}>
            • In case of wire cutting, broken light and repaired light will not
            be considered in guarantee.
          </Text>
          <Text style={styles.bullet}>
            • Without invoice does not accept the claim.
          </Text>
        </View>

        {/* Signature and QR */}
        <View style={styles.signatureContainer}>
          <View>
            <Text>Authorized Signature:</Text>
            <View style={styles.signatureBox}>
              <Text style={styles.weigth}>OneStopCar</Text>
            </View>
          </View>
          <Image src={qrCode} style={styles.qrCode} />
        </View>

        {/* Website */}
        <View style={{ marginTop: 10 }}>
          <Text>Visit our website:</Text>{" "}
          <Link src="https://onestopcar.net" style={styles.link}>
            onestopcar.net
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
