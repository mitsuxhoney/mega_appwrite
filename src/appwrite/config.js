import { configure } from '../configure/configure.js'
import { Databases, Client, Bucket, Query, ID } from 'appwrite'

export class Service {
    client = new Client()
    databases
    storage
    constructor() {
        this.client = new Client()
        this.client.setEndpoint(configure.appwriteUrl)
        this.client.setProject(configure.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Bucket(this.client)
    }
    async createPost({ title, content, featuredImage, status, userId }) {
        const result = await this.databases.createDocument(
            configure.appwriteDatabaseId,
            configure.appwriteCollectionId,
            ID.unique(),
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        )
        return result || null
    }
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        const result = this.databases.updateDocument(
            configure.appwriteDatabaseId,
            configure.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        )
        return result || null
    }

    async deletePost(slug) {
        const result = this.databases.deleteDocument(
            configure.appwriteDatabaseId,
            configure.appwriteCollectionId,
            slug
        )
        return result || null
    }

    async getPost(slug) {
        const result = this.databases.getDocument(
            configure.appwriteDatabaseId,
            configure.appwriteCollectionId,
            slug
        )
        return result || null
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]) {
        const result = await this.databases.listDocuments(
            configure.appwriteDatabaseId,
            configure.appwriteCollectionId,
            queries
        )
        return result || []
    }

    async fileUpload() {
        const file = await this.storage.createFile(
            configure.appwriteBucketId,
            ID.unique(),
            file
        )
        return file || false
    }

    async deleteFile(slug) {
        const result = await this.storage.deleteFile(
            configure.appwriteBucketId,
            slug
        )
        return result || false
    }

    async getFile(slug) {
        const result = await this.storage.getFile(
            configure.appwriteBucketId,
            slug
        )
        return result || false
    }

    async getFilePreview(slug) {
        const result = await this.storage.getFilePreview(
            configure.appwriteBucketId,
            slug
        )
        return result || false
    }
}

export const service = new Service()
