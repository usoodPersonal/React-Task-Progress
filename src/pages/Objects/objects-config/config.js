export const objectConfig = [
  {
    name: "AAA Server",
    children: [
      { name: "RADIUS Server Group", path: "/object/aaa-server/radius-server-group" },
      { name: "Single Sign-on Server", path: "/object/aaa-server/sso-server" }
    ]
  },
  {
    name: "Access List",
    children: [
      { name: "Extended", path: "/object/access-list/extended" },
      { name: "Standard", path: "/object/access-list/standard" }
    ]
  },
  {
    name: "Address Pools",
    children: [
      { name: "IPv4 Pools", path: "/object/address-pools/ipv4" },
      { name: "IPv6 Pools", path: "/object/address-pools/ipv6" },
      { name: "MAC Address Pool", path: "/object/address-pools/mac" }
    ]
  },
  { name: "Application Filters", path: "/object/application-filters" },
  { name: "AS Path", path: "/object/as-path" },
  { name: "BFD Template", path: "/object/bfd-template" },
  { name: "Cipher Suite List", path: "/object/cipher-suite-list" },
  {
    name: "Community List",
    children: [
      { name: "Community", path: "/object/community-list/community" },
      { name: "Extended Community", path: "/object/community-list/extended" }
    ]
  },
  { name: "DHCP IPv6 Pool", path: "/object/dhcp-ipv6-pool" },
  {
    name: "Distinguished Name",
    children: [
      { name: "Individual Objects", path: "/object/distinguished-name/individual" },
      { name: "Object Groups", path: "/object/distinguished-name/groups" }
    ]
  },
  { name: "DNS Server Group", path: "/object/dns-server-group" },
  {
    name: "External Attributes",
    children: [
      { name: "Dynamic Object", path: "/object/external-attributes/dynamic-object" },
      { name: "Security Group Tag", path: "/object/external-attributes/security-group-tag" }
    ]
  },
  { name: "File List", path: "/object/file-list" },
  {
    name: "FlexConfig",
    children: [
      { name: "FlexConfig Object", path: "/object/flexconfig/object" },
      { name: "Text Object", path: "/object/flexconfig/text" }
    ]
  },
  { name: "Geolocation", path: "/object/geolocation" },
  { name: "Interface", path: "/object/interface" },
  { name: "Key Chain", path: "/object/key-chain" },
  { name: "Network", path: "/object/network" },
  {
    name: "PKI",
    children: [
      { name: "Cert Enrollment", path: "/object/pki/cert-enrollment" },
      { name: "External Cert Groups", path: "/object/pki/external-cert-groups" },
      { name: "External Certs", path: "/object/pki/external-certs" },
      { name: "Internal CA Groups", path: "/object/pki/internal-ca-groups" },
      { name: "Internal CAs", path: "/object/pki/internal-cas" },
      { name: "Internal Cert Groups", path: "/object/pki/internal-cert-groups" },
      { name: "Internal Certs", path: "/object/pki/internal-certs" },
      { name: "Trusted CA Groups", path: "/object/pki/trusted-ca-groups" },
      { name: "Trusted CAs", path: "/object/pki/trusted-cas" }
    ]
  },
  { name: "Policy List", path: "/object/policy-list" },
  { name: "Port", path: "/object/port" },
  {
    name: "Prefix List",
    children: [
      { name: "IPv4 Prefix List", path: "/object/prefix-list/ipv4" },
      { name: "IPv6 Prefix List", path: "/object/prefix-list/ipv6" }
    ]
  },
  { name: "Route Map", path: "/object/route-map" },
  {
    name: "Security Intelligence",
    children: [
      { name: "DNS Lists and Feeds", path: "/object/security-intelligence/dns" },
      { name: "Network Lists and Feeds", path: "/object/security-intelligence/network" },
      { name: "URL Lists and Feeds", path: "/object/security-intelligence/url" }
    ]
  },
  { name: "Sinkhole", path: "/object/sinkhole" },
  { name: "SLA Monitor", path: "/object/sla-monitor" },
  { name: "Time Range", path: "/object/time-range" },
  { name: "Time Zone", path: "/object/time-zone" },
  { name: "Tunnel Zone", path: "/object/tunnel-zone" },
  { name: "URL", path: "/object/url" },
  { name: "Variable", path: "/object/variable" },
  { name: "Variable Set", path: "/object/variable-set" },
  { name: "VLAN Tag", path: "/object/vlan-tag" },
  {
    name: "VPN",
    children: [
      { name: "Certificate Map", path: "/object/vpn/certificate-map" },
      { name: "Custom Attribute", path: "/object/vpn/custom-attribute" },
      { name: "Group Policy", path: "/object/vpn/group-policy" },
      { name: "IKEv1 IPsec Proposal", path: "/object/vpn/ikev1-ipsec-proposal" },
      { name: "IKEv1 Policy", path: "/object/vpn/ikev1-policy" },
      { name: "IKEv2 IPsec Proposal", path: "/object/vpn/ikev2-ipsec-proposal" },
      { name: "IKEv2 Policy", path: "/object/vpn/ikev2-policy" },
      { name: "Secure Client Customization", path: "/object/vpn/secure-client-customization" },
      { name: "Secure Client File", path: "/object/vpn/secure-client-file" }
    ]
  }
];

export const preProcessObjectConfig = () => {
  const allPages = [];
  objectConfig.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) =>
        allPages.push({ name: child.name, path: child.path })
      );
    } else {
      allPages.push({ name: item.name, path: item.path });
    }
  });
  return allPages;
}