import { configure } from '../configure/configure.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account

    constructor() {
        this.client.setEndpoint(configure.appwriteUrl)
        this.client.setProject(configure.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        const userAccount = await this.client.account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if (userAccount) {
            return this.login({ email, password })
        } else {
            return null
        }
    }

    async login({ email, password }) {
        const userAccount =
            await this.client.account.createEmailPasswordSession(
                email,
                password
            )
        return userAccount || null
    }

    async getCurrentUser() {
        const user = await this.account.get()
        return user || null
    }

    async logout() {
        const result = await this.client.account.deleteSessions()
        return result || null
    }
}

export const authService = new AuthService()
