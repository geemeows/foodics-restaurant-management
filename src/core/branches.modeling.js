export const modelingBranches = (branches) => {
  const availableBranches = branches
    .filter(({ accepts_reservations }) => accepts_reservations)
    .map(({ id, name, reference, reservation_duration, sections }) => ({
      id,
      branchName: name,
      referenceNumber: reference,
      tablesCount: sections.reduce((acc, { tables }) => {
        const tablesCount = acc + tables.length
        return tablesCount
      }, 0),
      reservationDuration: reservation_duration,
    }))

    const disabledBranches = branches
    .filter(({ accepts_reservations }) => !accepts_reservations)
    .map(({ id, name, reference }) => ({
      id,
      branchName: name,
      referenceNumber: reference,
    }))

    return [availableBranches, disabledBranches]
}