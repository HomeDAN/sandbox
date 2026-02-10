export function makeXYZGUI(name: string, vector3: any, folder: any, onChangeFn: any) {

    const subFolder = folder.addFolder(name)

    subFolder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    subFolder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    subFolder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
}