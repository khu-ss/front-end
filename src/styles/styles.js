import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#dbe7f6",
    alignItems: "center",
  },

  appShell: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f5f7fb",
  },

  appShellWide: {
    maxWidth: 520,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#cbd5e1",
  },

  splashScreen: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  splashLogo: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#93c5fd",
    marginBottom: 18,
  },

  splashLogoText: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
  },

  splashTitleTop: {
    color: "#ffffff",
    fontSize: 33,
    fontWeight: "900",
    letterSpacing: 2.4,
    textAlign: "center",
  },

  splashTitleBottom: {
    color: "#93c5fd",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 5,
    textAlign: "center",
    marginTop: 3,
  },

  splashSubtitle: {
    color: "#cbd5e1",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 16,
    textAlign: "center",
  },

  registerScreen: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  registerContent: {
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  registerCard: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#111827",
    borderRadius: 30,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },

  registerBrandTop: {
    color: "#ffffff",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: 2.2,
    textAlign: "center",
  },

  registerBrandBottom: {
    color: "#93c5fd",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 4.5,
    textAlign: "center",
    marginTop: 2,
  },

  registerText: {
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 18,
    marginBottom: 18,
  },

  registerInput: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 11,
    color: "#ffffff",
    fontSize: 14,
    writingDirection: "rtl",
  },

  registerButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
  },

  registerButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  loadingTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a",
    textAlign: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#64748b",
    fontSize: 14,
    textAlign: "center",
  },

  content: {
    flex: 1,
    paddingHorizontal: 14,
  },

  contentPadding: {
    paddingBottom: 104,
  },

  brandCard: {
    backgroundColor: "#0f172a",
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  brandIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 3,
    borderColor: "#93c5fd",
  },

  brandIcon: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },

  brandTop: {
    fontSize: 29,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 2.2,
    textAlign: "center",
  },

  brandTopSmall: {
    fontSize: 24,
    letterSpacing: 1.4,
  },

  brandBottom: {
    fontSize: 23,
    fontWeight: "900",
    color: "#93c5fd",
    letterSpacing: 4.5,
    textAlign: "center",
    marginTop: 2,
  },

  brandBottomSmall: {
    fontSize: 19,
    letterSpacing: 3,
  },

  brandLine: {
    width: 90,
    height: 3,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    marginTop: 16,
    marginBottom: 14,
  },

  brandSubtitle: {
    color: "#e0f2fe",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  brandSlogan: {
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },

  todayPill: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  todayText: {
    color: "#dbeafe",
    fontSize: 13,
    fontWeight: "800",
  },

  welcomeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },

  welcomeTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
    textAlign: "right",
    marginBottom: 8,
  },

  welcomeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748b",
    textAlign: "right",
    marginTop: 4,
  },

  header: {
    marginTop: 20,
    marginBottom: 18,
    alignItems: "flex-end",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    textAlign: "right",
  },

  headerTitleSmall: {
    fontSize: 24,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
    textAlign: "right",
    lineHeight: 23,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  focusCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#2563eb",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  focusHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  focusLabel: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "right",
  },

  focusEmoji: {
    fontSize: 24,
  },

  focusCourse: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "right",
    marginBottom: 10,
  },

  focusPriorityRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  focusReason: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
    textAlign: "right",
  },

  focusDetails: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  focusDetailText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 5,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  smallCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: "#2563eb",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "700",
  },

  sectionTitleRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  sectionIcon: {
    fontSize: 23,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    textAlign: "right",
    marginBottom: 12,
  },

  text: {
    fontSize: 14,
    color: "#475569",
    textAlign: "right",
    lineHeight: 25,
  },

  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 14,
    color: "#111827",
    writingDirection: "rtl",
  },

  label: {
    fontSize: 14,
    color: "#374151",
    textAlign: "right",
    marginBottom: 8,
    fontWeight: "800",
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 4,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  secondaryButton: {
    backgroundColor: "#eff6ff",
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },

  secondaryButtonText: {
    color: "#1d4ed8",
    fontSize: 14,
    fontWeight: "900",
  },

  resetButton: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },

  resetButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  profileButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 30,
  },

  profileButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  listItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  reminderPreview: {
    backgroundColor: "#eff6ff",
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },

  doneItem: {
    opacity: 0.75,
    backgroundColor: "#f0fdf4",
  },

  itemTopRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  taskTitleArea: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111827",
    textAlign: "right",
    flex: 1,
    lineHeight: 23,
  },

  doneText: {
    textDecorationLine: "line-through",
    color: "#64748b",
  },

  itemSubtitle: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "right",
    marginTop: 5,
    lineHeight: 21,
  },

  deleteButton: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  deleteButtonText: {
    color: "#dc2626",
    fontWeight: "900",
    fontSize: 12,
  },

  progressOuter: {
    width: "100%",
    height: 10,
    backgroundColor: "#e2e8f0",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },

  progressInner: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 20,
  },

  progressActions: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    gap: 8,
    marginTop: 10,
  },

  progressButton: {
    backgroundColor: "#f97316",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },

  progressButtonPositive: {
    backgroundColor: "#16a34a",
  },

  progressButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 12,
  },

  priorityRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    marginBottom: 4,
  },

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },

  priorityText: {
    fontSize: 12,
    fontWeight: "900",
  },

  priorityDescription: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "right",
    flex: 1,
  },

  studyMiniBox: {
    backgroundColor: "#eef2ff",
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },

  studyMiniText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "right",
  },

  courseSelector: {
    marginBottom: 12,
  },

  courseChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  courseChipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  courseChipText: {
    color: "#374151",
    fontWeight: "800",
  },

  courseChipTextActive: {
    color: "#ffffff",
  },

  planItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 11,
    marginBottom: 8,
    gap: 10,
  },

  planNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2563eb",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 30,
    fontWeight: "900",
  },

  planText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
    textAlign: "right",
    lineHeight: 22,
  },

  countdownItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 17,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  countdownUrgent: {
    backgroundColor: "#fff7ed",
    borderColor: "#fed7aa",
  },

  countdownPast: {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
  },

  countdownBadge: {
    width: 72,
    minHeight: 72,
    borderRadius: 20,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    padding: 6,
  },

  countdownBadgeSmall: {
    width: 60,
    minHeight: 60,
    borderRadius: 17,
  },

  countdownNumber: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
  },

  countdownNumberSmall: {
    fontSize: 15,
  },

  countdownUnit: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },

  countdownInfo: {
    flex: 1,
  },

  achievementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  achievementCard: {
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
  },

  achievementUnlocked: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },

  achievementLocked: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
    opacity: 0.7,
  },

  achievementIcon: {
    fontSize: 24,
    textAlign: "right",
    marginBottom: 6,
  },

  achievementTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1d4ed8",
    textAlign: "right",
    marginBottom: 5,
  },

  achievementTitleLocked: {
    color: "#64748b",
  },

  achievementText: {
    fontSize: 11,
    color: "#64748b",
    textAlign: "right",
    lineHeight: 18,
  },

  successCard: {
    backgroundColor: "#dcfce7",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },

  successTitle: {
    color: "#15803d",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "right",
    marginBottom: 6,
  },

  successText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
    lineHeight: 22,
  },

  warningCard: {
    backgroundColor: "#fffbeb",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#fde68a",
  },

  warningTitle: {
    color: "#b45309",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "right",
    marginBottom: 6,
  },

  warningText: {
    color: "#92400e",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
    lineHeight: 22,
  },

  chartRow: {
    marginBottom: 16,
  },

  chartHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
    textAlign: "right",
  },

  chartValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#2563eb",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 78,
    backgroundColor: "#ffffff",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingHorizontal: 4,
    paddingTop: 6,
    paddingBottom: 8,
  },

  navItem: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 54,
  },

  navItemActive: {
    backgroundColor: "#eff6ff",
  },

  navIcon: {
    fontSize: 16,
    marginBottom: 2,
  },

  navText: {
    color: "#64748b",
    fontWeight: "800",
  },

  navTextActive: {
    color: "#2563eb",
    fontWeight: "900",
  },
});
