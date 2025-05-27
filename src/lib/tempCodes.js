const tempCodes = new Map();

export function saveCode(adminId, code) {
  tempCodes.set(adminId, {
    code,
    expires: Date.now() + 300000 // 5 минут
  });
}

export function getCode(adminId) {
  return tempCodes.get(adminId);
}

export function deleteCode(adminId) {
  tempCodes.delete(adminId);
}