class Facade {
    static publishIO(io) {
        global.io = io
    }

    static publishDB(db) {
        global.db = db
    }

    static publishDirs(__apps, __logs) {
        global.__apps = __apps
        global.__logs = __logs
    }

    static publishUniq(__uniq) {
        global.__uniq = __uniq
    }

    static io() {
        return global.io
    }

    static db() {
        return global.db
    }

    static __apps() {
        return global.__apps
    }

    static __uniq() {
        return global.__uniq
    }
}

module.exports = Facade;
