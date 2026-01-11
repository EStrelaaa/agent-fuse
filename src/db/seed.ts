import { db } from "./index.js";
import { contactsTable, foldersTable, emailsTable } from "./schema.js";

export async function seed() {
  // Seed contacts
  const contacts = await db.insert(contactsTable).values([
    { name: "Me", email: "me@myshop.com" },
    { name: "Emily Wolfe", email: "emily.wolfe@gmail.com" },
    { name: "Supplier C", email: "supplierC@fabricdirect.com" },
    { name: "Supplier A", email: "supplierA@logisticsco.com" },
    { name: "TrendCircle Marketing", email: "marketing@trendcircle.io" },
    { name: "SilverLeaf Boutique", email: "boutique@silverleaf.co" },
    { name: "Airbridge Support", email: "carrier-support@airbridge.co" },
    { name: "Trade Portal Gov", email: "gov-tax@tradeportal.gov" },
    { name: "John Hartley", email: "john.hartley@yahoo.com" },
  ]).returning();

  const contactByEmail = Object.fromEntries(contacts.map((c) => [c.email, c]));
  const me = contactByEmail["me@myshop.com"]!;

  // Seed folders
  const folders = await db.insert(foldersTable).values([
    { path: "/" },
    { path: "/Inbox" },
    { path: "/Starred" },
    { path: "/Needs_Action" },
    { path: "/Orders" },
    { path: "/Orders/2026" },
    { path: "/Orders/2026/Feb" },
    { path: "/Customers" },
    { path: "/Customers/Returns" },
    { path: "/Sent" },
  ]).returning();

  const folderByPath = Object.fromEntries(folders.map((f) => [f.path, f]));

  // Seed emails
  await db.insert(emailsTable).values([
    // Inbox
    {
      sender: contactByEmail["emily.wolfe@gmail.com"]!.id,
      recipient: me.id,
      subject: "Customer Inquiry - Size Chart",
      body: "Hi, I'm interested in your products but couldn't find a size chart. Could you please send one? Thanks, Emily",
      sentAt: new Date("2026-01-10T09:15:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: false,
      needsAction: false,
    },
    {
      sender: contactByEmail["supplierC@fabricdirect.com"]!.id,
      recipient: me.id,
      subject: "PO Confirmation #2026-0038",
      body: "Your purchase order #2026-0038 has been confirmed. Expected ship date: Feb 15, 2026.",
      sentAt: new Date("2026-01-09T14:30:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: false,
      needsAction: false,
    },
    {
      sender: contactByEmail["supplierA@logisticsco.com"]!.id,
      recipient: me.id,
      subject: "Shipping Delay Notice",
      body: "Due to weather conditions, your shipment will be delayed by 3-5 business days. We apologize for the inconvenience.",
      sentAt: new Date("2026-01-08T11:00:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: false,
      needsAction: false,
    },
    {
      sender: contactByEmail["marketing@trendcircle.io"]!.id,
      recipient: me.id,
      subject: "Partnership Proposal - TrendCircle",
      body: "We'd love to feature your products on our platform. Let's schedule a call to discuss partnership opportunities.",
      sentAt: new Date("2026-01-07T16:45:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: false,
      needsAction: false,
    },

    // Starred (also in their actual folders but marked starred)
    {
      sender: contactByEmail["boutique@silverleaf.co"]!.id,
      recipient: me.id,
      subject: "Wholesale Inquiry - SilverLeaf Boutique",
      body: "We're a boutique in Portland and interested in carrying your line. What are your wholesale terms?",
      sentAt: new Date("2026-01-06T10:20:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: true,
      needsAction: false,
    },
    {
      sender: contactByEmail["supplierA@logisticsco.com"]!.id,
      recipient: me.id,
      subject: "Re: Restock ETA For Red Jackets",
      body: "The red jackets will be back in stock by end of February. I'll send tracking once they ship.",
      sentAt: new Date("2026-01-05T13:10:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: true,
      needsAction: false,
    },

    // Needs Action
    {
      sender: contactByEmail["carrier-support@airbridge.co"]!.id,
      recipient: me.id,
      subject: "Missing Documents - Customs",
      body: "Your shipment is held at customs. Please provide commercial invoice and packing list ASAP.",
      sentAt: new Date("2026-01-04T08:00:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: false,
      needsAction: true,
    },
    {
      sender: contactByEmail["gov-tax@tradeportal.gov"]!.id,
      recipient: me.id,
      subject: "Last Call: VAT Filing Deadline",
      body: "Reminder: Your VAT filing is due January 15, 2026. Failure to file may result in penalties.",
      sentAt: new Date("2026-01-03T07:00:00Z"),
      folderId: folderByPath["/Inbox"]!.id,
      starred: false,
      needsAction: true,
    },

    // Orders/2026/Feb
    {
      sender: contactByEmail["supplierC@fabricdirect.com"]!.id,
      recipient: me.id,
      subject: "PO Confirmation #2026-0038",
      body: "Your purchase order #2026-0038 has been confirmed. Expected ship date: Feb 15, 2026.",
      sentAt: new Date("2026-02-01T14:30:00Z"),
      folderId: folderByPath["/Orders/2026/Feb"]!.id,
      starred: false,
      needsAction: false,
    },
    {
      sender: contactByEmail["supplierA@logisticsco.com"]!.id,
      recipient: me.id,
      subject: "Shipping Delay Notice",
      body: "Due to weather conditions, your shipment will be delayed by 3-5 business days.",
      sentAt: new Date("2026-02-03T11:00:00Z"),
      folderId: folderByPath["/Orders/2026/Feb"]!.id,
      starred: false,
      needsAction: false,
    },

    // Customers/Returns
    {
      sender: contactByEmail["john.hartley@yahoo.com"]!.id,
      recipient: me.id,
      subject: "Return Request #8743",
      body: "I'd like to return my order. The size didn't fit as expected. Order #8743.",
      sentAt: new Date("2026-01-02T15:30:00Z"),
      folderId: folderByPath["/Customers/Returns"]!.id,
      starred: false,
      needsAction: false,
    },

    // Sent
    {
      sender: me.id,
      recipient: contactByEmail["emily.wolfe@gmail.com"]!.id,
      subject: "Re: Customer Inquiry - Size Chart",
      body: "Hi Emily, Thanks for reaching out! I've attached our size chart. Let me know if you have any questions. Best, Shop Team",
      sentAt: new Date("2026-01-10T10:30:00Z"),
      folderId: folderByPath["/Sent"]!.id,
      starred: false,
      needsAction: false,
    },
  ]);

  console.log("Seed complete!");
}
