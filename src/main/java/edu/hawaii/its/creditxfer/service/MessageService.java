package edu.hawaii.its.creditxfer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.hawaii.its.creditxfer.repository.MessageRepository;
import edu.hawaii.its.creditxfer.type.Message;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @CacheEvict(value = "messages", allEntries = true)
    public void evictCache() {
        // Empty.
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "messages", key = "#id")
    public Message findMessage(Integer id) {
        return messageRepository.findById(id).orElse(null);
    }

    @Transactional
    @CachePut(value = "messages", key = "#result")
    public Message update(Message message) {
        return messageRepository.save(message);
    }

    @Transactional
    @CachePut(value = "messages", key = "#result")
    public Message add(Message message) {
        return messageRepository.save(message);
    }
}